import React, { useEffect, useState } from "react";
import axios from "axios";
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
  useToast,
  Select,
} from "@chakra-ui/react";
import jwt_decode from "jwt-decode";
import { getCityByProvince, getProvince } from "../../api/address";
const AddAddress = ({ isOpen, onClose, onAddAddress }) => {
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  console.log('selected province', selectedProvinceId)
  const token = localStorage.getItem("token");
  const userId = jwt_decode(token).id;
  const toast = useToast();
  const fetchProvince = async () => {
    await getProvince(setProvince, toast)
  }

  const fetchCity = async () => {
    if (selectedProvinceId) {
      await getCityByProvince(selectedProvinceId, setCity, toast)
    }
  }
  useEffect(() => {
    fetchProvince();
    fetchCity();
  }, [selectedProvinceId])

  const handleSelectProvince = (e) => {
    setSelectedProvinceId(e.target.value);
    setCity([]);
  }

  const initialFormData = {
    id_user: userId,
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
        <ModalBody color={"white"}>
          <FormControl mb={2}>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              color={"#233947"}
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Province</FormLabel>
            <Select placeholder='Select Province' value={selectedProvinceId} onChange={handleSelectProvince}>
              {province.map((province) => (
                <option key={province.province_id} value={province.province_id}>{province.province}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Select>
              {city.map((city) => (
                <option style={{ color: "white" }} key={city.city_id} value={city.city_name}>{city.city_name}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>Postal Code</FormLabel>
            <Input
              type="number"
              color={"#233947"}
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Full Address</FormLabel>
            <Input
              type="text"
              color={"#233947"}
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
