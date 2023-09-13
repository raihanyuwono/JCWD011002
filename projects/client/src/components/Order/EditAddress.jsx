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
  Checkbox,
  useToast,
  Select,
} from "@chakra-ui/react";
import { getCityByProvince, getProvince, updateAddressUser } from "../../api/address";

const EditAddress = ({ isOpen, onClose, onEditAddress, addressData }) => {
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
  console.log("slected address id", selectedProvinceId)
  console.log("in addressData edit address", addressData)
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
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(selectedId);
    setSelectedProvinceName(selectedName);
    setCity([]);
  }

  const initialFormData = {
    name: addressData.name || "",
    province: addressData.province || "",
    city_name: addressData.city_name || "",
    postal_code: addressData.postal_code || "",
    full_address: addressData.full_address || "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const toast = useToast();
  useEffect(() => {
    setFormData({
      name: addressData.name || "",
      province: addressData.province || "",
      city_name: addressData.city_name || "",
      postal_code: addressData.postal_code || "",
      full_address: addressData.full_address || "",
    });
  }, [addressData]);
  console.log("in province edit address", formData)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };



  const handleEditAddress = async () => {
    try {
      await updateAddressUser(addressData, formData, toast, onEditAddress, onClose, selectedProvinceName);
    } catch (error) {
      console.error("Error editing address:", error);
    }
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
            <Select placeholder={formData.province} name="province" value={selectedProvinceId} onChange={handleSelectProvince}>
              {province.map((province) => (
                <option key={province.province_id} value={province.province_id}>{province.province}</option>
              ))}
            </Select>
          </FormControl>
          <FormControl mb={2}>
            <FormLabel>City Name</FormLabel>
            <Select placeholder={selectedProvinceId ? "select city" : formData.city_name} name="city_name" value={formData.city_name} onChange={handleChange} >
              {city.map((city) => (
                <option style={{ color: "white" }} key={city.city_id} value={city.city_name}>{city.city_name}</option>
              ))}
            </Select>
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
          <Checkbox colorScheme="blue" name="is_default" isChecked={formData.is_default} onChange={handleChange}>
            Set as default
          </Checkbox>
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
