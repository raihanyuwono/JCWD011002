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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Select,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Box,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Flex,
  Input,
} from "@chakra-ui/react";
import { BsBoxArrowInUpRight } from "react-icons/bs";
import SeeDetailMutation from "./SeeDetailMutation";

const SeeDetail = ({ warehouse_name, month }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button size={"md"} variant={"edit"} onClick={onOpen}>
        Detail&nbsp;
        <BsBoxArrowInUpRight size={18} />
      </Button>
      <Modal
        size={"3xl"}
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
              <Table size="sm">
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
                  {month?.map((item) => (
                    <Tr key={item?.month_id}>
                      <Td>{item?.month}</Td>
                      <Td>{item?.year}</Td>
                      <Td isNumeric>{item?.sum_addition_qty}</Td>
                      <Td isNumeric>{item?.sum_subtraction_qty}</Td>
                      <Td>
                        <SeeDetailMutation
                        warehouse_name={warehouse_name}
                          month_name={item?.month}
                          year={item?.year}
                          mutation={item?.product_stock_history}
                        />
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
