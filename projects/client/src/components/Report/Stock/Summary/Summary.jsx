import React, { useEffect, useState } from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import axios from "axios";
import { FaWarehouse } from "react-icons/fa";
import SeeDetail from "./SeeDetail";

const Summary = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [warehouse, setWarehouse] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/stock/summary`);
      setWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Flex direction={"column"} gap={2} mr={2}>
        {warehouse.map((item) => (
          <Flex
            key={item.id}
            w={"79vw"}
            p={"15px"}
            bg="bgSecondary"
            borderRadius="lg"
            boxShadow="sm"
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Flex justifyContent={"flex-start"}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                bg={"#34638A"}
                h={"60px"}
                w={"60px"}
                borderRadius={"full"}
              >
                <FaWarehouse size={"22px"} />
              </Box>
              <Flex
                justifyContent={"center"}
                color={"white"}
                direction={"column"}
              >
                <Text
                  ml={4}
                  fontSize={"lg"}
                  align={"right"}
                  fontWeight={"bold"}
                >
                  {item.warehouse_name}
                </Text>
              </Flex>
            </Flex>
            <Box>
              <SeeDetail
                warehouse_name={item.warehouse_name}
                month={item.data}
              />
            </Box>
          </Flex>
        ))}
      </Flex>
    </>
  );
};

export default Summary;
