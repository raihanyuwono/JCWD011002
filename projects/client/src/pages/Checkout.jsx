import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Image,
  Button,
  Box,
  Flex,
  useToast,
  Select,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import jwt_decode from "jwt-decode";
import SelectAddress from "../components/Order/SelectAddress";
import SelectShipping from "../components/Order/SelectShipping";
import toRupiah from "@develoka/angka-rupiah-js";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const service = localStorage.getItem("service").toUpperCase();
  const myLatitude = localStorage.getItem("myLatitude");
  const myLongitude = localStorage.getItem("myLongitude");
  const [shipping, setShipping] = useState(
    parseInt(localStorage.getItem("shipping")) || 0
  );
  const grand = total + parseInt(shipping);
  const [payment, setPayment] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const handlePaymentMethodChange = (event) => {
    const selectedMethodId = event.target.value;
    const selectedMethod = payment.find(
      (method) => method.id === parseInt(selectedMethodId)
    );
    setSelectedPayment(selectedMethod);
  };

  const getShippingLS = () => {
    const updatedShipping = parseInt(localStorage.getItem("shipping")) || 0;
    setShipping(updatedShipping);
  };
  useEffect(() => {
    const intervalId = setInterval(getShippingLS, 200);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const viewCart = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/order/cart/${userId}`
    );
    setCart(response.data.data);
  };
  const getTotal = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/order/${userId}`
    );
    setTotal(response.data.data.total);
  };
  const checkout = async () => {
    const response = await axios.post("http://localhost:8000/api/transaction", {
      userId: userId,
      payment: selectedPayment ? selectedPayment.id : null,
      shipping: service,
      total: grand,
      myLatitude,
      myLongitude,
    });
    toast({
      title: "Thanks for your purchase!",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    setSelectedPayment(null);
    localStorage.setItem("shipping", 0);
    localStorage.setItem("service", "none");
    localStorage.setItem("selectedCourier", null);
    localStorage.removeItem("wh_city");
    setTotal(0);
    viewCart();
    navigate("/");
  };

  const getPayment = async () => {
    const response = await axios.get("http://localhost:8000/api/transaction");
    setPayment(response.data.data);
  };

  useEffect(() => {
    viewCart();
    getTotal();
    getPayment();
  }, []);
  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} mt={8} mb={4}>
          Checkout
        </Text>
        <Box mb={2} w={"80vw"} px={6} py={6} bgColor={"secondary"}>
          <SelectAddress />
        </Box>
        <TableContainer>
          <Table variant="simple" color={"#34638a"} w={"80vw"} bgColor="white">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}>Quantity</Th>
                <Th textAlign={"center"}>Subtotal</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.length === 0 ? (
                <Tr>
                  <Td colSpan="6">
                    <Text>No Product in the Cart!</Text>
                  </Td>
                </Tr>
              ) : (
                cart.map((item) =>
                  item.quantity > 0 ? (
                    <Tr key={item.productId}>
                      <Td>
                        <Image w={"50px"} src={item.image} />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td textAlign={"center"}>
                        {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                      </Td>
                      <Td textAlign={"center"}>{item.quantity}</Td>
                      <Td textAlign={"center"}>
                        {toRupiah(item.subtotal, {
                          dot: ".",
                          floatingPoint: 0,
                        })}
                      </Td>
                    </Tr>
                  ) : null
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <Flex>
          <Box
            px={6}
            py={6}
            color={"#34638a"}
            mt={1}
            // h={"15vh"}
            w={"50vw"}
            bgColor="white"
          >
            <Flex justifyContent={"space-between"}>
              <SelectShipping />
              <Box>
                <Select
                  bgColor={"#EDF2F7"}
                  color={"black"}
                  fontWeight={"bold"}
                  w={"210px"}
                  icon={<AiOutlineCaretDown />}
                  placeholder="Payment Methods"
                  onChange={handlePaymentMethodChange}
                  value={selectedPayment ? selectedPayment.id : ""}
                >
                  {payment.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </Select>
                {selectedPayment && (
                  <Box key={selectedPayment.id}>
                    <Text mt={2}>Payment: {selectedPayment.name}</Text>
                    Please Transfer to: {selectedPayment.identifier}
                  </Box>
                )}
              </Box>
            </Flex>
          </Box>
          <Box
            px={6}
            py={6}
            color={"#34638a"}
            mt={1}
            w={"30vw"}
            bgColor="textSecondary"
          >
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Subtotal Product:</Text>
              <Text>{toRupiah(total, { dot: ".", floatingPoint: 0 })}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Shipping Cost:</Text>
              <Text>{toRupiah(shipping, { dot: ".", floatingPoint: 0 })}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Tax:</Text>
              <Text>Rp0</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text fontWeight={"bold"} fontSize={"xl"} mt={4}>
                Grand Total:
              </Text>
              <Text fontWeight={"bold"} fontSize={"xl"} mt={4}>
                {toRupiah(grand, { dot: ".", floatingPoint: 0 })}
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex>
          <Box mt={1} w={"50vw"}></Box>
          <Box
            color={"#34638a"}
            mt={1}
            mb={7}
            w={"30vw"}
            bgColor="textSecondary"
          >
            <Button
              onClick={checkout}
              w={"100%"}
              borderRadius={"none"}
              variant={"success"}
            >
              Checkout
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Checkout;
