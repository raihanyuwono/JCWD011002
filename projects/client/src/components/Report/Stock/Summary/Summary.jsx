import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../../Pagination";
import OrderBy from "./OrderBy";
import FilterBy from "../../FilterBy";
import SeeDetail from "./SeeDetail";

const Summary = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [stock, setStock] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("");

  const fetchStock = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/stock/summary`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          filterByMonth,
          filterByYear,
        },
      });
      setStock(response.data.data);
      setTotalPages(response.data.total_page);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStock();
  }, [filterByMonth, filterByYear, orderBy, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Flex>
        <FilterBy
          filterByMonth={filterByMonth}
          setFilterByMonth={setFilterByMonth}
          filterByYear={filterByYear}
          setFilterByYear={setFilterByYear}
        />
        <OrderBy orderBy={orderBy} setOrderBy={setOrderBy} />
      </Flex>
      <TableContainer mt={4}>
        <Table
          variant="striped"
          bgColor={"bgSecondary"}
          colorScheme="whiteAlpha"
        >
          <Thead bgColor={"primary"}>
            <Tr>
              <Th textAlign="center" color={"white"}>
                NO
              </Th>
              <Th textAlign="center" color={"white"}>
                MONTH
              </Th>
              <Th textAlign="center" color={"white"}>
                YEAR
              </Th>
              <Th textAlign="center" color={"white"}>
                QTY REDUCTION
              </Th>
              <Th textAlign="center" color={"white"}>
                QTY ADDITION
              </Th>
              <Th textAlign="center" color={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {stock.map((item) => (
              <Tr key={item.data_id}>
                <Td textAlign="center">{item.data_id}</Td>
                <Td textAlign="center">{item.month}</Td>
                <Td textAlign="center">{item.year}</Td>
                <Td textAlign="center">{item.subtraction_qty}</Td>
                <Td textAlign="center">{item.addition_qty}</Td>
                <Td textAlign="center">
                  <SeeDetail
                    month={item.month}
                    year={item.year}
                    last_stock={item.last_stock}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {stock.length >= 10 ? (
        <Pagination
          totalItems={stock.length}
          itemsPerPage={10}
          onPageChange={handlePageChange}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default Summary;
