import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";

const EditAddress = ({ isOpen, onClose, onEditAddress, addressData }) => {
  const initialFormData = {
    id_user: addressData.id_user || "",
    name: addressData.name || "",
    province: addressData.province || "",
    city_name: addressData.city_name || "",
    postal_code: addressData.postal_code || "",
    full_address: addressData.full_address || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    // Update formData when addressData changes
    setFormData({
      id_user: addressData.id_user || "",
      name: addressData.name || "",
      province: addressData.province || "",
      city_name: addressData.city_name || "",
      postal_code: addressData.postal_code || "",
      full_address: addressData.full_address || "",
    });
  }, [addressData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEditAddress = () => {
    onEditAddress(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={"white"} bgColor={"#233947"}>
        <ModalHeader>Edit Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
              bg={"white"}
              color={"#233947"}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Province</FormLabel>
            <Input
              type="text"
              bg={"white"}
              color={"#233947"}
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Input
              type="text"
              bg={"white"}
              color={"#233947"}
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              bg={"white"}
              color={"#233947"}
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Full Address</FormLabel>
            <Input
              type="text"
              bg={"white"}
              color={"#233947"}
              name="full_address"
              value={formData.full_address}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            bgColor={"#34638A"}
            color={"white"}
            _hover={{ bgColor: "gray.200", color: "#34638A" }}
            colorScheme="blue"
            onClick={handleEditAddress}
          >
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditAddress;
