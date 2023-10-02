import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Select,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import toRupiah from "@develoka/angka-rupiah-js";

const ModalDetail = ({ detail_product_sales, product_name }) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  const getWarehouseName = (warehouseId) => {
    const warehouse = dataWarehouse.find((item) => item.id === warehouseId);
    return warehouse ? warehouse.name : "";
  };

  return (
    <>
      <Button variant="edit" size="sm" onClick={onOpen}>
        Detail
      </Button>

      <Modal size={"3xl"} onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent bgColor={"bgSecondary"}>
          <ModalHeader color={"white"}>{product_name}</ModalHeader>
          <ModalCloseButton color={"white"} />
          <ModalBody>
            <Flex>
              <Select
                bg={"white"}
                color={"black"}
                mb={2}
                size={"sm"}
                placeholder="All Warehouse"
              >
                {dataWarehouse.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </Select>
              <Select
                bg={"white"}
                color={"black"}
                mb={2}
                ml={2}
                size={"sm"}
                placeholder="Sort By"
              >
                <option>DATE : ASC</option>
                <option>DATE : DESC</option>
              </Select>
            </Flex>
            <TableContainer>
              <Table
                size={"sm"}
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
                      INVOICE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      INVOICE DATE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      QTY
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      SALE PRICE
                    </Th>
                    <Th textAlign="center" color={"white"}>
                      WH FROM
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {detail_product_sales.map((detailSale) => (
                    <Tr key={detailSale.data_id}>
                      <Td textAlign="center" color={"white"}>
                        {detailSale.data_id}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        MWECG2/ID/TXN{detailSale.transaction_id}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {detailSale.transaction_date}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {detailSale.qty}
                      </Td>
                      <Td textAlign="center" color={"white"}>
                        {toRupiah(detailSale.price, {
                          dot: ".",
                          floatingPoint: 0,
                        })}
                      </Td>
                      <Td textAlign="right" color={"white"}>
                        {getWarehouseName(detailSale.warehouse_id)} (
                        {detailSale.warehouse_id})
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalDetail;
