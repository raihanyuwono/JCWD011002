import {
  Flex,
  Table,
  TableContainer,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import TransactionList from "./TransactionList";
import { useEffect, useState } from "react";
import { getTransactions } from "../../../../api/transactions";
import Pagination from "../../../Utility/Pagination";
import { useSearchParams } from "react-router-dom";

const mainContainer = {
  direction: "column",
  w: "full",
};

const tableAttr = {
  variant: "striped",
  bgColor: "bgSecondary",
  colorScheme: "whiteAlpha",
};

const tHeadAttr = {
  bgColor: "primary",
};

const thAttr = {
  textAlign: "center",
  color: "textPrimary",
};

function ManageOrder() {
  const [transactions, setTransaction] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const toast = useToast();
  const [searchParams, setSearchParams] = useSearchParams({
    page: 1,
    category: 0,
    product: 0,
    order: "name",
    month: 0,
    year: 0,
    sort: "DESC",
  });
  const currentPage = searchParams.get("page");
  const currentCategory = searchParams.get("category");
  const currentProduct = searchParams.get("product");
  const currentOrder = searchParams.get("order");
  const currentMonth = searchParams.get("month");
  const currentYear = searchParams.get("year");
  const currentSort = searchParams.get("sort");

  async function fetchTransactions() {
    const attributes = {
      page: 1, // current page
      pageSize: 10, // limit
      orderBy: currentOrder,
      filterByMonth: currentMonth,
      filterByYear: currentYear,
      categoryId: currentCategory,
      productId: currentProduct,
    };
    const result = await getTransactions(toast, attributes);
    const { data, totalPages } = result;
    setTransaction(data);
    setMaxPage(totalPages);
  }

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage: setSearchParams,
  };

  useEffect(() => {
    fetchTransactions();
  }, [
    currentPage,
    currentCategory,
    currentProduct,
    currentOrder,
    currentMonth,
    currentYear,
  ]);

  const headers = [
    "ID",
    "Date",
    "Status",
    "User",
    "Payment Method",
    "Payment Status",
    "Shipping Method",
    "Total",
  ];

  return (
    <Flex {...mainContainer}>
      <TableContainer>
        <Table {...tableAttr}>
          <Thead {...tHeadAttr}>
            <Tr>
              {headers.map((header, index) => (
                <Th {...thAttr} key={index}>
                  {header}
                </Th>
              ))}
            </Tr>
          </Thead>
          <TransactionList transactions={transactions} />
        </Table>
      </TableContainer>
      <Pagination {...paginationAttr} />
    </Flex>
  );
}

export default ManageOrder;
