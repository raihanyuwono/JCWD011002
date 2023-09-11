import React, { useEffect, useState } from "react";
import axios from "axios";
import { Divider, Flex, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import toRupiah from "@develoka/angka-rupiah-js";

const OrderSummary = ({ userId, cartLength }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [total, setTotal] = useState(0);
  const getCartTotal = async () => {
    const response = await axios.get(`${API_URL}/order/${userId}`);
    setTotal(response.data.data.total);
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      getCartTotal();
    }, 1500);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Flex
        borderRightRadius={"10px"}
        display={"flex"}
        direction={"column"}
        alignSelf={"flex-end"}
        bgColor={"white"}
        color={"#34638a"}
        px={6}
        py={6}
        w={"20vw"}
      >
        <Text fontWeight={"bold"} fontSize={"2xl"}>
          ORDER SUMMARY
        </Text>
        <Divider />
        <br />
        <Text>Checkout ({cartLength} Product)</Text>
        <Text fontWeight={"bold"}>
          Total: {toRupiah(total, { dot: ".", floatingPoint: 0 })}
        </Text>
        <br />
        <Link to="/">Or continue shopping?</Link>
      </Flex>
    </>
  );
};

export default OrderSummary;
