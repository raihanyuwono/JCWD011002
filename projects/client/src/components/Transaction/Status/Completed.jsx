import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Button, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import FilterBy from "../FilterBy";
import toRupiah from "@develoka/angka-rupiah-js";
import SeeDetailTxn from "../SeeDetailTxn";
import ViewReceipt from "../ViewReceipt";

const Completed = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("desc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/${userId}/?sortBy=${filterBy}&page=${currentPage}&pageSize=10&filterStatus=5&searchProductName=${searchQuery}&startDate=${startDate}&endDate=${endDate}`
      );
      setData(response.data.data);
      setTotalPages(response.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, filterBy, searchQuery, startDate, endDate]);

  const handleDateRangeFilter = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <>
      <Flex justifyContent={"space-between"} mb={4}>
        <Box w={"30vw"}>
          <SearchBar onSearch={setSearchQuery} />
        </Box>
        <Box ml={2}>
          <FilterBy
            onFilterChange={setFilterBy}
            onDateRangeFilter={handleDateRangeFilter}
          />
        </Box>
      </Flex>
      {data.map((item) => (
        <Box
          key={item.transactionId}
          mb={2}
          bg={"bgSecondary"}
          p={4}
          w={"70vw"}
          color={"white"}
        >
          <Flex justifyContent={"space-between"}>
            <Flex>
              <Text fontWeight={"bold"}>{item.txn_date}&nbsp;</Text>
              <Badge alignSelf={"center"} colorScheme="green">
                {item.status}
              </Badge>
              <Text>&nbsp;MWECG2/ID/TXN{item.transactionId}</Text>
            </Flex>
            {/* <ViewReceipt transactionId={item.transactionId} /> */}
            <Button size={"xs"} borderRadius={"none"} variant={"success"}>
              ORDER RECEIVED
            </Button>
          </Flex>
          <Divider mt={2} mb={2} />
          <Flex align={"center"} justifyContent={"space-between"}>
            <Flex>
              <Image borderRadius={"5px"} w={"75px"}
                src={`${API_URL}/${item.product_image}`} />
              <Flex direction={"column"}>
                <Text ml={4} fontWeight={"bold"}>
                  {item.product_name}
                </Text>
                {item.numProducts > 1 ? (
                  <Text ml={4} fontSize={"sm"}>
                    + {item.numProducts} other
                  </Text>
                ) : (
                  <></>
                )}
              </Flex>
            </Flex>
            <Flex direction={"column"}>
              <Text fontSize={"sm"}>Total:</Text>
              <Text fontWeight={"bold"} fontSize={"xl"}>
                {toRupiah(item.total, { dot: ".", floatingPoint: 0 })}
              </Text>
              <SeeDetailTxn transactionId={item.transactionId} />
            </Flex>
          </Flex>
        </Box>
      ))}
      <Pagination
        totalItems={totalPages * 10}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default Completed;
