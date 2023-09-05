import React, { useEffect, useState } from "react";
import axios from "axios";
import { DeleteIcon } from "@chakra-ui/icons";
import {
  useNumberInput,
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
} from "@chakra-ui/react";
import OrderSummary from "../components/order/OrderSummary";
const CartPage = () => {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({
      step: 1,
      defaultValue: 1,
      min: 0,
      max: 9000,
    });
  const inc = getIncrementButtonProps();
  const dec = getDecrementButtonProps();
  const input = getInputProps();

  const userId = localStorage.getItem("userId");
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
    const intervalId = setInterval(() => {
      viewCart();
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

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
          <Table variant="simple" color={"#34638a"} bgColor="white">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Product</Th>
                <Th textAlign={"center"}>Price</Th>
                <Th textAlign={"center"}>Quantity</Th>
                <Th> </Th>
                <Th textAlign={"center"}>Subtotal</Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.map((item) => (
                <Tr>
                  <Td>
                    <Image src={item.image} />
                  </Td>
                  <Td>{item.name}</Td>
                  <Td>Rp.{item.price}</Td>
                  <Td textAlign={"center"}>{item.quantity}</Td>
                  <Td>
                    <Box>
                      <HStack textAlign={"center"} maxW="220px">
                        <IconButton
                          isRound={true}
                          variant="solid"
                          colorScheme="red"
                          aria-label="Delete"
                          fontSize="20px"
                          icon={<DeleteIcon />}
                        />
                        <Button {...dec}>-</Button>
                        <Input textAlign={"center"} {...input} />
                        <Button colorScheme="facebook" {...inc}>
                          +
                        </Button>
                      </HStack>
                    </Box>
                  </Td>
                  <Td>Rp.{item.subtotal}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
        <Box mt={"77px"}>
          <Button colorScheme="red" borderRadius={"none"}>
            Clear
          </Button>
          <Button borderRadius={"none"} colorScheme="green">
            Checkout
          </Button>
          <OrderSummary cartLength={cartLength} userId={userId} />
        </Box>
      </Flex>
    </>
  );
};

export default CartPage;
