import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Flex,
  ModalFooter,
} from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import SeeDetailMutation from "./SeeDetailMutation";

const SeeDetail = ({ warehouse_name, month }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const mergeMonthData = (monthData) => {
    const allMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const currentYear = new Date().getFullYear();
    return allMonths.map((monthName) => {
      const foundMonth = monthData.find((item) => item?.month === monthName);

      if (foundMonth) {
        return foundMonth;
      } else {
        return {
          month: monthName,
          year: currentYear,
          sum_addition_qty: 0,
          sum_subtraction_qty: 0,
          product_stock_history: [],
        };
      }
    });
  };

  const mergedMonthData = mergeMonthData(month);

  return (
    <>
      <Button size={"md"} variant={"edit"} onClick={onOpen}>
        Show&nbsp;
        <BsBoxArrowInUpRight size={18} />
      </Button>
      <Modal
        size={"5xl"}
        scrollBehavior={"inside"}
        onClose={onClose}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"primary"} color={"white"}>
            {warehouse_name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8} color={"white"} bgColor={"bgSecondary"}>
            <Flex direction={"row"} alignItems={"center"} mb={2}>
              <Select
                size={"sm"}
                color={"black"}
                bg={"white"}
                placeholder="Select Year"
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
              </Select>
            </Flex>
            <TableContainer>
              <Table
                variant="striped"
                colorScheme="whiteAlpha"
                bgColor={"bgSecondary"}
                size="sm"
              >
                <TableCaption color={"white"}>
                  Only displays data for the current year, use filters for
                  previous years
                </TableCaption>
                <Thead bg={"primary"}>
                  <Tr>
                    <Th color={"white"}>MONTH</Th>
                    <Th color={"white"}>YEAR</Th>
                    <Th color={"white"} isNumeric>
                      TOTAL INCOMING QTY
                    </Th>
                    <Th color={"white"} isNumeric>
                      TOTAL OUTCOMING QTY
                    </Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mergedMonthData.map((item, index) => (
                    <Tr key={index}>
                      <Td>{item?.month}</Td>
                      <Td>{item?.year}</Td>
                      <Td isNumeric>{item?.sum_addition_qty}</Td>
                      <Td isNumeric>{item?.sum_subtraction_qty}</Td>
                      <Td textAlign={"center"}>
                        {item.product_stock_history.length > 0 ? (
                          <SeeDetailMutation
                            warehouse_name={warehouse_name}
                            month_name={item?.month}
                            year={item?.year}
                            mutation={item?.product_stock_history}
                          />
                        ) : (
                          <></>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetail;
