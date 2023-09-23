import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import OrderBy from "./OrderBy";
import Pagination from "../../Pagination";

const Detail = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [data, setData] = useState([]);
  const [orderBy, setOrderBy] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productId, setProductId] = useState("");

  const fetchDetail = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/stock`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          productId,
        },
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [orderBy, currentPage, productId]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Flex>
        <OrderBy
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          productId={productId}
          setProductId={setProductId}
        />
      </Flex>
      <TableContainer mt={4}>
        <Table
          variant="striped"
          colorScheme="whiteAlpha"
          bgColor={"bgSecondary"}
        >
          <Thead bgColor={"primary"}>
            <Tr>
              <Th color={"white"}>NO</Th>
              <Th color={"white"}>WH FROM</Th>
              <Th color={"white"}>WH TO</Th>
              <Th color={"white"}>PRODUCT</Th>
              <Th color={"white"}>QTY</Th>
              <Th color={"white"}>STATUS</Th>
              <Th color={"white"}>TXN ID</Th>
              <Th color={"white"}>TXN DATE</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((item) => (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.wh_from}</Td>
                <Td>{item.wh_to}</Td>
                <Td>{item.product}</Td>
                <Td>{item.qty}</Td>
                <Td>{item.status}</Td>
                <Td>MWECG2/ID/TXN{item.txn_id}</Td>
                <Td>{item.txn_date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Pagination
        totalItems={data.length}
        itemsPerPage={10}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default Detail;
