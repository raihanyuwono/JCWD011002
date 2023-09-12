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
  FormControl,
  Input,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { LuCopy } from "react-icons/lu";

const UploadReceipt = ({ isOpen, onClose, onSave, txnid }) => {
  const [receipt, setReceipt] = useState(null);
  const [payment, setPayment] = useState("");
  const [identifier, setIdentifier] = useState("");
  const toast = useToast();
  const userId = jwt_decode(localStorage.getItem("token")).id;

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setReceipt(file);
  };

  const handleSave = async () => {
    if (!receipt) {
      console.log("No image selected.");
      return;
    }
    const formData = new FormData();
    formData.append("receipt", receipt);
    try {
      await axios.post(
        `http://localhost:8000/api/transaction/receipt/${txnid}`,
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

  const fetchPayment = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/transaction/${userId}`,
        {
          transactionId: txnid,
        }
      );
      setPayment(response.data.data.payment_method);
      setIdentifier(response.data.data.identifier);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPayment();
  }, []);

  return (
    <Modal
      isCentered
      isOpen={isOpen}
      onClose={onClose}
      blockScrollOnMount={false}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <Text mb={2} fontSize="xs">
              MWEC/ID/TXN{txnid}
            </Text>
            <Text fontSize="xs">Method: {payment}</Text>
            <Text mb={2} fontSize="xs">
              1. Open your mobile banking app <br /> 2. Select the m-Transfer{" "}
              <br />
              3. Enter the destination account number is:
              <Flex align={"center"}>
                <Text fontSize={"md"} mt={2} mb={2} fontWeight={"bold"}>
                  &nbsp;&nbsp;&nbsp;{identifier}&nbsp;
                </Text>
                <LuCopy
                  toast={toast}
                  size={18}
                  cursor={"pointer"}
                  onClick={() => navigator.clipboard.writeText(identifier)}
                />
              </Flex>
              4. Input amount of the transfer <br /> 5. Make sure the
              information is correct <br /> 6. Confirm the transfer <br /> 7.
              Upload receipt here
            </Text>
            <Input
              mt={2}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
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
