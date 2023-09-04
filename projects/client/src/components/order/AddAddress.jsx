import React from "react";
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

const AddAddress = ({ isOpen, onClose, onAddAddress }) => {
  const initialFormData = {
    id_user: "get from local storage",
    name: "",
    province: "",
    city_name: "",
    postal_code: "",
    full_address: "",
    is_default: false,
  };

  const [formData, setFormData] = React.useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddAddress = () => {
    onAddAddress(formData);
    setFormData(initialFormData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent color={"white"} bgColor={"#233947"}>
        <ModalHeader>Add New Address</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
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
              name="province"
              value={formData.province}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Input
              type="text"
              name="city_name"
              value={formData.city_name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Address</FormLabel>
            <Input
              type="text"
              name="full_address"
              value={formData.full_address}
              onChange={handleChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            mb={2}
            bgColor={"#34638A"}
            color={"white"}
            _hover={{ bgColor: "gray.200", color: "#34638A" }}
            onClick={handleAddAddress}
          >
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddAddress;
