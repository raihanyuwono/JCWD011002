import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Badge,
  Divider,
  filter,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { MdLocationOn } from "react-icons/md";
import axios from "axios";
import DeleteAddress from "../Profile/DeleteAddress";
import jwtDecode from "jwt-decode";

const SelectAddress = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const userId = jwtDecode(localStorage.getItem("token")).id;
  const [isSelectAddressModalOpen, setIsSelectAddressModalOpen] =
    useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const selectAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const token = localStorage.getItem("token");
  const [dataAddress, setDataAddress] = useState([]);

  const openSelectAddressModal = () => {
    setIsSelectAddressModalOpen(true);
  };

  const closeSelectAddressModal = () => {
    setIsSelectAddressModalOpen(false);
  };

  const openAddAddressModal = () => {
    setIsAddAddressModalOpen(true);
    setIsSelectAddressModalOpen(false);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressModalOpen(false);
    setIsSelectAddressModalOpen(true);
  };

  const handleSelect = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
    localStorage.setItem("city_name", address.city_name);
    localStorage.setItem("myLatitude", address.latitude);
    localStorage.setItem("myLongitude", address.longitude);
    closeSelectAddressModal();
  };

  const handleAddAddress = (formData) => {
    console.log("Adding address:", formData);
    closeAddAddressModal();
  };

  const openEditAddressModal = (address) => {
    setEditAddressData(address);
    setIsEditAddressModalOpen(true);
    setIsSelectAddressModalOpen(false);
  };

  const closeEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
    setIsSelectAddressModalOpen(true);
  };

  const handleEditAddress = (formData) => {
    console.log("Editing address:", formData);
    closeEditAddressModal();
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${API_URL}/address`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDataAddress(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDefault = async () => {
    try {
      const response = await axios.post(`${API_URL}/address/default`, {
        userId: userId,
      });
      localStorage.setItem(
        "selectedAddress",
        JSON.stringify(response.data.data)
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAddress();
    fetchDefault();
  }, []);

  return (
    <Box>
      <Flex>
        <Text fontWeight={"bold"} fontSize={"lg"}>
          Shipping Address&nbsp;
        </Text>
        <MdLocationOn size={25} />
      </Flex>
      <Divider mt={2} mb={2} />
      <Flex align={"center"} justifyContent={"space-between"}>
        <Box>
          <AddAddress
            isOpen={isAddAddressModalOpen}
            onClose={closeAddAddressModal}
            onAddAddress={handleAddAddress}
          />
          {editAddressData && (
            <EditAddress
              isOpen={isEditAddressModalOpen}
              onClose={closeEditAddressModal}
              onEditAddress={handleEditAddress}
              addressData={editAddressData}
            />
          )}

          <Modal
            size={"2xl"}
            isOpen={isSelectAddressModalOpen}
            onClose={closeSelectAddressModal}
          >
            <ModalOverlay />
            <ModalContent bgColor={"#233947"}>
              <ModalHeader color={"white"}>Shipping tojgjg?</ModalHeader>
              <ModalCloseButton color={"white"} />
              <ModalBody>
                <Button
                  color={"white"}
                  onClick={openAddAddressModal}
                  w={"100%"}
                  _hover={{ bgColor: "white", color: "#34638A" }}
                  variant={"outline"}
                >
                  Add New Address
                </Button>
                <Box>
                  {dataAddress.length === 0 ? (
                    <Text align={"center"} color={"white"}>
                      No Address Found!
                    </Text>
                  ) : (
                    dataAddress.map((address) => (
                      <Text
                        bgColor={"white"}
                        boxShadow={"xl"}
                        borderRadius={"5px"}
                        mt={3}
                        key={address.id}
                      >
                        <Flex flexDirection={"column"}>
                          <Flex
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            mr={5}
                          >
                            <Text
                              px={3}
                              py={2}
                              fontSize={"md"}
                              fontWeight={"bold"}
                            >
                              {address.name}
                              &nbsp;
                              {address.is_default && (
                                <Badge colorScheme="green">Default</Badge>
                              )}
                            </Text>
                            <DeleteAddress addressData={address} />
                          </Flex>
                          <Divider />
                          <Text
                            px={3}
                            mt={1}
                            fontSize={"lg"}
                            fontWeight={"bold"}
                          >
                            {address.user.name}
                          </Text>
                          <Text px={3} fontSize={"sm"}>
                            {address.user.phone}
                          </Text>
                          <Text px={3} fontSize={"sm"}>
                            {address.full_address}, {address.city_name},{" "}
                            {address.province}, {address.postal_code}
                          </Text>
                        </Flex>
                        <Flex
                          justifyContent={"space-between"}
                          align={"center"}
                          mr={4}
                        >
                          <Button
                            ml={3}
                            mt={3}
                            mb={3}
                            onClick={() => handleSelect(address)}
                            size="sm"
                            bgColor={"#34638A"}
                            color={"white"}
                            _hover={{ bgColor: "gray.200", color: "#34638A" }}
                          >
                            Select
                          </Button>
                          <FiEdit
                            onClick={() => openEditAddressModal(address)}
                            cursor={"pointer"}
                            color="#34638A"
                            size={25}
                          />
                        </Flex>
                      </Text>
                    ))
                  )}
                </Box>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
          {selectAddress && (
            <Box key={selectAddress.id}>
              <Text fontWeight={"bold"}>{selectAddress.name}</Text>
              <Text>
                {selectAddress.full_address}, {selectAddress.city_name},{" "}
                {selectAddress.province}, {selectAddress.postal_code}
              </Text>
            </Box>
          )}
        </Box>
        <Button size="md" mt={2} onClick={openSelectAddressModal}>
          Select Address
        </Button>
      </Flex>
    </Box>
  );
};

export default SelectAddress;
