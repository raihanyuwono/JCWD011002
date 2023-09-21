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
  Image,
} from "@chakra-ui/react";
import axios from "axios";
import Pagination from "../../Pagination";
import FilterBy from "../../FilterBy";
import OrderBy from "./OrderBy";
import toRupiah from "@develoka/angka-rupiah-js";

const Product = () => {
  const [product, setProduct] = useState([]);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [warehouseId, setWarehouseId] = useState("");

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchSales = async () => {
    try {
      setProduct([]);
      const response = await axios.get(`${API_URL}/report/sales/product`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          filterByMonth,
          filterByYear,
          warehouseId,
        },
      });
      setProduct(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [filterByMonth, filterByYear, orderBy, currentPage, warehouseId]);

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
        <OrderBy
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          warehouseId={warehouseId}
          setWarehouseId={setWarehouseId}
        />
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
                PRODUCT ID
              </Th>
              <Th color={"white"}>IMAGE</Th>
              <Th textAlign="center" color={"white"}>
                NAME
              </Th>
              <Th textAlign="center" color={"white"}>
                CATEGORY
              </Th>
              <Th textAlign="center" color={"white"}>
                PRICE
              </Th>
              <Th textAlign="center" color={"white"}>
                QTY SOLD
              </Th>
              <Th textAlign="center" color={"white"}>
                TOTAL SALES
              </Th>
              <Th textAlign="center" color={"white"}>
                YEAR-MONTH
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {product.map((sale) => (
              <Tr key={sale.id_product}>
                <Td textAlign="center">{sale.id_product}</Td>
                <Td textAlign="center">
                  <Image width="50px" src={sale.image} alt={sale.name} />
                </Td>
                <Td>{sale.name}</Td>
                <Td textAlign="center">{sale.category}</Td>
                <Td textAlign="center">
                  {toRupiah(sale.price, { dot: ".", floatingPoint: 0 })}
                </Td>
                <Td textAlign="center">{sale.total_qty_sold}</Td>
                <Td textAlign="center">
                  {toRupiah(sale.total_sales, { dot: ".", floatingPoint: 0 })}
                </Td>
                <Td textAlign="center">{sale.month_year}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {product.length >= 10 ? (
        <Pagination
          totalItems={product.length}
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

export default Product;
