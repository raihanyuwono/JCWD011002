import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Flex,
} from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";

const SeeDetail = ({ month, year, last_stock }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  function getMonth(value) {
    const months = [
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
    if (value >= 1 && value <= 12) {
      return months[value - 1];
    } else {
      return "Invalid Month";
    }
  }

  return (
    <>
      <Button size={"sm"} variant={"edit"} onClick={onOpen}>
        Last Stock&nbsp;
        <BsBoxArrowInUpRight size={18} />
      </Button>
      <Modal
        size={"lg"}
        scrollBehavior={"inside"}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader bgColor={"primary"} color={"white"}>
            Last Stock
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8} color={"white"} bgColor={"bgSecondary"}>
            <Flex direction={"row"} alignItems={"center"} mb={2}>
              <Text fontWeight={"bold"}>Period :</Text>
              <Text mt={0.5}>&nbsp;{getMonth(month)}</Text>
              <Text mt={1}>&nbsp;{year}</Text>
            </Flex>
            <TableContainer>
              <Table size="sm">
                <Thead bg={"primary"}>
                  <Tr>
                    <Th color={"white"}>ID</Th>
                    <Th color={"white"}>NAME</Th>
                    <Th color={"white"} isNumeric>
                      LAST STOCK
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {last_stock?.map((product) => (
                    <Tr key={product.id}>
                      <Td>{product.id}</Td>
                      <Td>{product.product_name}</Td>
                      <Td isNumeric>{product.last_stock}</Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetail;
