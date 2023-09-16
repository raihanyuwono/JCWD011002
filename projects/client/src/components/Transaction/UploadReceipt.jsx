import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  Input,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const UploadReceipt = ({ isOpen, onClose, onSave }) => {
  const [receipt, setReceipt] = useState(null);
  const toast = useToast();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setReceipt(file);
  };

  const handleSave = async () => {
    if (!receipt) {
      console.log("No image selected.");
      return;
    }

    const transactionId = 208;
    const formData = new FormData();
    formData.append("receipt", receipt);
    try {
      await axios.post(
        `http://localhost:8000/api/transaction/receipt/${transactionId}`,
        formData
      );
      toast({
        title: "Successfully upload receipt!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onSave(receipt);
      onClose();
    } catch (error) {
      toast({
        title: "Error upload receipt!",
        description: error.response.data.message,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      console.log("Error upload receipt:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} blockScrollOnMount={false}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Input type="file" accept="image/*" onChange={handleImageUpload} />
          </FormControl>
          {receipt && (
            <img
              src={URL.createObjectURL(receipt)}
              alt="Profile"
              style={{ maxWidth: "100%", marginTop: "1rem" }}
            />
          )}
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button variant={"success"} onClick={handleSave} disabled={!receipt}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UploadReceipt;
