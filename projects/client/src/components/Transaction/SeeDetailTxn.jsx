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
} from "@chakra-ui/react";

const SeeDetailTxn = ({ transactionId, isOpen, onClose }) => {
  return (
    <>
      <Modal
        isCentered
        size={"xl"}
        onClose={onClose}
        isOpen={isOpen}
        scrollBehavior="outside"
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transaction Detail</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{transactionId}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SeeDetailTxn;
