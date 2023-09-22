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

const Category = () => {
  const [category, setCategory] = useState([]);
  const [filterByMonth, setFilterByMonth] = useState("");
  const [filterByYear, setFilterByYear] = useState("");
  const [orderBy, setOrderBy] = useState("month_year DESC");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [warehouseId, setWarehouseId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const API_URL = process.env.REACT_APP_API_BASE_URL;

  const fetchSales = async () => {
    try {
      setCategory([]);
      const response = await axios.get(`${API_URL}/report/sales/category`, {
        params: {
          page: currentPage,
          pageSize: 10,
          orderBy,
          filterByMonth,
          filterByYear,
          warehouseId,
          categoryId,
        },
      });
      setCategory(response.data.categories);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, [
    filterByMonth,
    filterByYear,
    orderBy,
    currentPage,
    warehouseId,
    categoryId,
  ]);

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
          categoryId={categoryId}
          setCategoryId={setCategoryId}
        />
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
                CATEGORY ID
              </Th>
              <Th color={"white"}>CATEGORY NAME</Th>
              <Th textAlign="center" color={"white"}>
                QTY SOLD
              </Th>
              <Th textAlign="center" color={"white"}>
                TOTAL SALES
              </Th>
              <Th textAlign="center" color={"white"}>
                MONTH-YEAR
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {category.map((sale) => (
              <Tr key={sale.id_category}>
                <Td textAlign="center">{sale.id_category}</Td>
                <Td>{sale.category_name}</Td>
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
      {category.length >= 10 ? (
        <Pagination
          totalItems={category.length}
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

export default Category;
