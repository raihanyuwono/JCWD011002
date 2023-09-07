import React, { useEffect, useState } from "react";
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
  HStack,
  Input,
  Box,
  IconButton,
  Flex,
  useToast,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import SelectAddress from "../components/Order/SelectAddress";
import SelectShipping from "../components/Order/SelectShipping";
const Checkout = () => {
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const shipping = localStorage.getItem("shipping");
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

  useEffect(() => {
    viewCart();
    getTotal();
  }, []);

  return (
    <>
      <Flex direction={"column"} alignItems={"center"}>
        <Text fontSize={"3xl"} mt={8} mb={4}>
          Checkout
        </Text>
        <Box mb={2} w={"60vw"} px={6} py={6} bgColor={"secondary"}>
          <SelectAddress />
        </Box>
        <TableContainer>
          <Table variant="simple" color={"#34638a"} w={"60vw"} bgColor="white">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}>Quantity</Th>
                <Th textAlign={"center"}>Subtotal</Th>
                {/* <Th textAlign={"center"}></Th> */}
              </Tr>
            </Thead>
            <Tbody>
              {cart.length === 0 ? (
                <Tr>
                  <Td colSpan="6">
                    <Text>No Product in the Cart!</Text>
                    <Button
                      as={Link}
                      to={"/"}
                      mb={2}
                      mt={4}
                      variant={"success"}
                    >
                      Shop Now!
                    </Button>
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
                      <Td textAlign={"center"}>Rp{item.price}</Td>
                      <Td textAlign={"center"}>{item.quantity}</Td>
                      <Td textAlign={"center"}>Rp{item.subtotal}</Td>
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
            w={"40vw"}
            bgColor="white"
          >
            <SelectShipping />
          </Box>
          <Box
            px={6}
            py={6}
            color={"#34638a"}
            mt={1}
            // h={"30vh"}
            w={"20vw"}
            bgColor="textSecondary"
          >
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Subtotal Product:</Text>
              <Text>Rp{total}</Text>
            </Flex>
            <Flex justifyContent={"space-between"}>
              <Text mt={1}>Shipping Cost:</Text>
              <Text>Rp{shipping}</Text>
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
                Rp0
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Flex>
          <Box mt={1} w={"40vw"}></Box>
          <Box color={"#34638a"} mt={1} w={"20vw"} bgColor="textSecondary">
            <Button w={"100%"} borderRadius={"none"} variant={"success"}>
              Checkout
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Checkout;
