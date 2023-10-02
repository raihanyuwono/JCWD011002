import React from "react";
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
} from "@chakra-ui/react";
import toRupiah from "@develoka/angka-rupiah-js";

const ModalDetail = ({ detail_product_sales, product_name }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
