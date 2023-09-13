import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { Box, Divider, Flex, Image, Text } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";
import Pagination from "../Pagination";
import SearchBar from "../SearchBar";
import FilterBy from "../FilterBy";
import toRupiah from "@develoka/angka-rupiah-js";
import SeeDetailTxn from "../SeeDetailTxn";
import ButtonUpload from "../ButtonUpload";
import CancelOrder from "../CancelOrder";

const ToPay = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwt_decode(localStorage.getItem("token")).id;
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterBy, setFilterBy] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTxn, setselectedTxn] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/transaction/${userId}/?sortBy=${filterBy}&page=${currentPage}&pageSize=10&filterStatus=1&searchProductName=${searchQuery}&startDate=${startDate}&endDate=${endDate}`
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
  const handleOpenModal = (transactionId) => {
    setselectedTxn(transactionId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setselectedTxn(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <Flex mb={4}>
        <Box w={"20vw"}>
          <SearchBar onSearch={setSearchQuery} />
        </Box>
        &nbsp;&nbsp;
        <Box w={"29vw"}>
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
          bg={"white"}
          p={4}
          w={"50vw"}
          color={"black"}
          cursor={"pointer"}
        >
          <Flex justifyContent={"space-between"}>
            <Flex onClick={() => handleOpenModal(item.transactionId)}>
              <Text fontWeight={"bold"}>{item.txn_date}&nbsp;</Text>
              <Badge alignSelf={"center"} colorScheme="green">
                {item.status}
              </Badge>
              <Text>&nbsp;MWECG2/ID/TXN{item.transactionId}</Text>
            </Flex>
            <Flex>
              <ButtonUpload transactionId={item.transactionId} />
              &nbsp;
              <CancelOrder transactionId={item.transactionId} />
            </Flex>
          </Flex>
          <Divider mt={2} mb={2} />
          <Flex
            onClick={() => handleOpenModal(item.transactionId)}
            align={"center"}
            justifyContent={"space-between"}
          >
            <Flex>
              <Image borderRadius={"5px"} src={item.product_image} />
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
            </Flex>
          </Flex>
        </Box>
      ))}
      <SeeDetailTxn
        transactionId={selectedTxn}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <Pagination
        totalItems={totalPages * 10}
        itemsPerPage={10}
        onPageChange={setCurrentPage}
        currentPage={currentPage}
      />
    </>
  );
};

export default ToPay;
