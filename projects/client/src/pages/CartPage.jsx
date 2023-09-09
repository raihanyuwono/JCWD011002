import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
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
import OrderSummary from "../components/Order/OrderSummary";
import { Link } from "react-router-dom";
import ClearAlert from "../components/Order/ClearAlert";
import jwt_decode from "jwt-decode";
import toRupiah from "@develoka/angka-rupiah-js";
const CartPage = () => {
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const toast = useToast();
  const [cart, setCart] = useState([]);
  const [cartLength, setCartLength] = useState(0);

  const viewCart = async () => {
    const response = await axios.get(
      `http://localhost:8000/api/order/cart/${userId}`
    );
    setCart(response.data.data);
    setCartLength(response.data.data.length);
  };

  useEffect(() => {
    viewCart();
  }, []);

  const handleDelete = async (productId) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/order/remove",
        {
          userId: userId,
          productId: productId,
        }
      );
      if (response.status === 200) {
        viewCart();
      } else {
        console.error("Failed to delete from cart.");
      }
    } catch (error) {
      console.error("Error deleting from cart:", error);
    }
  };

  const handleSetQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await axios.post("http://localhost:8000/api/order/remove", {
          userId: userId,
          productId: productId,
        });
      } else {
        await axios.patch("http://localhost:8000/api/order/set", {
          userId: userId,
          productId: productId,
          quantity: newQuantity,
        });
      }
      viewCart();
    } catch (error) {
      toast({
        title: "Oh no:(",
        description: error.response.data.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      console.error("Error updating item quantity:", error);
    }
  };

  return (
    <>
      <Flex justify={"center"}>
        <TableContainer
          borderBottomRadius={"10px"}
          borderTopLeftRadius={"10px"}
          borderLeftRadius={"10px"}
        >
          <Text fontSize={"3xl"} mt={4} mb={4}>
            Cart
          </Text>
          <Table variant="simple" color={"#34638a"} w={"65vw"} bgColor="white">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}>Quantity</Th>
                <Th textAlign={"center"}>Subtotal</Th>
                <Th textAlign={"center"}></Th>
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
                        <Image src={item.image} />
                      </Td>
                      <Td>{item.name}</Td>
                      <Td>
                        {toRupiah(item.price, { dot: ".", floatingPoint: 0 })}
                      </Td>
                      <Td>
                        <Box>
                          <HStack textAlign={"center"} maxW="220px">
                            <Button
                              border={"1px solid #2D2D2D"}
                              onClick={() =>
                                handleSetQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </Button>
                            <Input
                              textAlign={"center"}
                              type="number"
                              value={item.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value);
                                handleSetQuantity(item.productId, newQuantity);
                              }}
                            />
                            <Button
                              border={"1px solid #2D2D2D"}
                              onClick={() =>
                                handleSetQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </Button>
                          </HStack>
                        </Box>
                      </Td>
                      <Td>
                        {toRupiah(item.subtotal, {
                          dot: ".",
                          floatingPoint: 0,
                        })}
                      </Td>
                      <Td>
                        <IconButton
                          isRound={true}
                          variant="solid"
                          colorScheme="red"
                          aria-label="Delete"
                          fontSize="20px"
                          icon={<DeleteIcon />}
                          onClick={() => handleDelete(item.productId)}
                        />
                      </Td>
                    </Tr>
                  ) : null
                )
              )}
            </Tbody>
          </Table>
        </TableContainer>
        <Box mt={"77px"}>
          <ClearAlert coba={viewCart} userId={userId} />
          {cart.length === 0 ? (
            <Button
              as={Link}
              display={"none"}
              to={"/checkout"}
              borderRadius={"none"}
              colorScheme="green"
              borderTopRightRadius={"10px"}
            >
              Checkout
            </Button>
          ) : (
            <Button
              as={Link}
              to={"/checkout"}
              borderRadius={"none"}
              colorScheme="green"
              borderTopRightRadius={"10px"}
            >
              Checkout
            </Button>
          )}
          <OrderSummary cartLength={cartLength} userId={userId} />
        </Box>
      </Flex>
    </>
  );
};

export default CartPage;
