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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Input,
} from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import Pagination from "../../Pagination";

const SeeDetail = ({ mutation, month_name, year, warehouse_name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size={"xs"} variant={"edit"} onClick={onOpen}>
        Detail&nbsp;
        <BsBoxArrowInUpRight size={14} />
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
            {warehouse_name} {"=>"} {month_name} {year}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={8} color={"white"} bgColor={"bgSecondary"}>
            <Flex direction={"row"} alignItems={"center"} mb={2}>
              <Input
                size={"sm"}
                type={"text"}
                color={"black"}
                bg={"white"}
                placeholder="Search by Product"
              />
            </Flex>
            <TableContainer>
              <Table
                size="sm"
                variant="striped"
                colorScheme="whiteAlpha"
                bgColor={"bgSecondary"}
              >
                <Thead bg={"primary"}>
                  <Tr>
                    <Th color={"white"} textAlign={"center"}>
                      PRODUCT
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      OUTCOMING QTY
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      INCOMING QTY
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      FINAL QTY MUTATION
                    </Th>
                    <Th color={"white"} textAlign={"center"}>
                      LAST STOCK IN WH
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {mutation?.map((item) => (
                    <Tr key={item?.id_product}>
                      <Td>{item?.product_name}</Td>
                      <Td textAlign={"center"}>{item?.subtraction_qty}</Td>
                      <Td textAlign={"center"}>{item?.addition_qty}</Td>
                      <Td textAlign={"center"}>{item?.final_qty_mutation}</Td>
                      <Td textAlign={"center"}>
                        {item?.last_stock_in_warehouse}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
            <Pagination
              totalItems={10}
              itemsPerPage={10}
              // onPageChange={handlePageChange}
              // currentPage={currentPage}
              totalPages={1}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetail;
