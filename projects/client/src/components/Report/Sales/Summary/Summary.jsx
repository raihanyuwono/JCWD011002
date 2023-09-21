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
  Button,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../../Pagination";
import FilterBy from "../../FilterBy";
import OrderBy from "./OrderBy";
import toRupiah from "@develoka/angka-rupiah-js";

const Summary = () => {
  const [sales, setSales] = useState([]);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          filterByMonth,
          filterByYear,
        },
      });
      setSales(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
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
          <Thead>
            <Tr>
              <Th textAlign="center" color={"white"}>
                TXN ID
              </Th>
              <Th textAlign="center" color={"white"}>
                TXN DATE
              </Th>
              <Th textAlign="center" color={"white"}>
                STATUS
              </Th>
              <Th textAlign="center" color={"white"}>
                USER
              </Th>
              <Th textAlign="center" color={"white"}>
                PAY. METHOD
              </Th>
              <Th textAlign="center" color={"white"}>
                PAY. STATUS
              </Th>
              <Th color={"white"}>SHIP. METHOD</Th>
              {/* <Th color={"white"}>SHIP. COST</Th> */}
              <Th textAlign="center" color={"white"}>
                IS CONFIRM
              </Th>
              <Th textAlign="center" color={"white"}>
                TOTAL
              </Th>
              <Th textAlign="center" color={"white"}></Th>
            </Tr>
          </Thead>
          <Tbody>
            {sales.map((sale) => (
              <Tr key={sale.transactionId}>
                <Td textAlign="center">MWEGC2/ID/TXN{sale.transactionId}</Td>
                <Td textAlign="center">{sale.created_at}</Td>
                <Td textAlign="center" wordBreak="break-word">
                  {sale.status === "Menunggu Pembayaran" ? (
                    <Text>To Pay</Text>
                  ) : sale.status === "Menunggu Konfirmasi Pembayaran" ? (
                    <Text>To Confirm</Text>
                  ) : sale.status === "Diproses" ? (
                    <Text>Processed</Text>
                  ) : sale.status === "Dikirim" ? (
                    <Text>Shipped</Text>
                  ) : sale.status === "Pesanan Dikonfirmasi" ? (
                    <Text>Completed</Text>
                  ) : sale.status === "Dibatalkan" ? (
                    <Text>Cancelled</Text>
                  ) : (
                    <></>
                  )}
                </Td>
                <Td textAlign="center">{sale.user_name}</Td>
                <Td textAlign="center">{sale.payment_method}</Td>
                <Td textAlign="center">{sale.payment_status}</Td>
                <Td textAlign="center">{sale.shipping_method}</Td>
                {/* <Td>Rp45.000</Td> */}
                <Td textAlign="center">{sale.is_confirm ? "Yes" : "No"}</Td>
                <Td isNumeric>
                  {toRupiah(sale.total, { dot: ".", floatingPoint: 0 })}
                </Td>
                <Td>
                  <Button bgColor={"primary"} color={"white"} size="sm">
                    Detail
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {sales.length >= 10 ? (
        <Pagination
          totalItems={sales.length}
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
