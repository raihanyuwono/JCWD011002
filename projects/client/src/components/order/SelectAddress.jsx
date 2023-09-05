// components/AddressList.js
import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";

const dummyAddress = [
  {
    id: 1,
    name: "Rumah",
    id_user: "Febry Dharmawan Jr",
    province: "California",
    city_name: "Los Angeles",
    postal_code: 90001,
    full_address: "123 Main St",
    is_default: true,
  },
  {
    id: 2,
    name: "Kantor",
    id_user: "Andre Djawa Temanggung",
    province: "New York",
    city_name: "New York City",
    postal_code: 10001,
    full_address: "456 Elm St",
    is_default: false,
  },
  {
    id: 3,
    name: "Kantor",
    id_user: "Rizky Freon",
    province: "Los Santos",
    city_name: "San Andreas",
    postal_code: 70001,
    full_address: "789 San St",
    is_default: false,
  },
];

const SelectAddress = ({ onSelectAddress }) => {
  const [isSelectAddressModalOpen, setIsSelectAddressModalOpen] =
    useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);

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
    console.log(address);
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
    // handle update adres
    console.log("Editing address:", formData);
    closeEditAddressModal();
  };
  return (
    <Box>
      <Button
        size="md"
        variant={"outline"}
        colorScheme="blue"
        onClick={openSelectAddressModal}
      >
        Select Address
      </Button>
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
          <ModalHeader color={"white"}>Shipping to?</ModalHeader>
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
              {dummyAddress.length === 0 ? (
                <Text align={"center"} color={"white"}>
                  No Address Found!
                </Text>
              ) : (
                dummyAddress.map((address) => (
                  <Text
                    bgColor={"white"}
                    boxShadow={"xl"}
                    borderRadius={"5px"}
                    mt={3}
                    key={address.id}
                  >
                    <Flex flexDirection={"column"}>
                      <Text px={3} py={2} fontSize={"md"} fontWeight={"bold"}>
                        {address.name}
                        &nbsp;
                        {address.is_default && (
                          <Badge colorScheme="green">Default</Badge>
                        )}
                      </Text>
                      <Divider />
                      <Text px={3} mt={1} fontSize={"lg"} fontWeight={"bold"}>
                        {address.id_user}
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
      {selectedAddress && (
        <Box mt={4}>
          <Text>Selected Address:</Text>
          <Text>
            {selectedAddress.name}, {selectedAddress.full_address},{" "}
            {selectedAddress.city_name}, {selectedAddress.province},{" "}
            {selectedAddress.postal_code}
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default SelectAddress;
