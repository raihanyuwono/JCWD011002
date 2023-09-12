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
  filter,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import AddAddress from "../components/Order/AddAddress";
import EditAddress from "../components/Order/EditAddress";
import { MdLocationOn } from "react-icons/md";
import { BsTrash3 } from "react-icons/bs";
import DeleteAddress from "../components/Profile/DeleteAddress";
const dummyAddress = [
  {
    id: 1,
    name: "Rumah",
    id_user: "Febry Dharmawan",
    phone: "081234567890",
    province: "Jawa Timur",
    city_name: "Sidoarjo",
    postal_code: 61252,
    full_address: "Jl Sesama No 22 Sidoarjo",
    is_default: true,
    latitude: -7.417166656128915,
    longitude: 112.75669259021905,
  },
  {
    id: 2,
    name: "Kantor",
    id_user: "Andre Djawa",
    phone: "081234567890",
    province: "Nusa Tenggara Timur (NTT)",
    city_name: "Alor",
    postal_code: 85811,
    full_address: "Jl Laksda Adisucipto No 1 Alor",
    is_default: false,
    latitude: -8.696554473073343,
    longitude: 121.2176540613792,
  },
  {
    id: 3,
    name: "Kantor",
    id_user: "Rizky Freon",
    phone: "081234567890",
    province: "Kalimantan Timur",
    city_name: "Balikpapan",
    postal_code: 76111,
    full_address: "Jl Balik Papan No 90 Balikpapan",
    is_default: false,
    latitude: -1.696554473073343,
    longitude: 116.696554473073343,
  },
];

const UserAddress = () => {
  const [isSelectAddressModalOpen, setIsSelectAddressModalOpen] =
    useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const selectAddress = JSON.parse(localStorage.getItem("selectedAddress"));

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
  return (
    <Box>
      <Flex alignItems={"center"} justifyContent={"center"}>
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
                <Box bgColor={"white"} color={"#34638A"} boxShadow={"xl"} borderRadius={"5px"} mt={3} key={address.id}>
                  <Flex flexDirection={"column"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mr={5}>
                      <Text px={3} py={2} fontSize={"md"} fontWeight={"bold"}>
                        {address.name}&nbsp;
                        {address.is_default && (
                          <Badge colorScheme="green">Default</Badge>
                        )}
                      </Text>
                      <DeleteAddress />
                    </Flex>
                    <Divider />
                    <Text color={"#34638A"} px={3} mt={1} fontSize={"lg"} fontWeight={"bold"}>
                      {address.id_user}
                    </Text>
                    <Text px={3} fontSize={"sm"}>{address.phone}</Text>
                    <Text px={3} fontSize={"sm"}>
                      {address.full_address}, {address.city_name},{" "}
                      {address.province}, {address.postal_code}
                    </Text>
                  </Flex>
                  <Flex justifyContent={"space-between"} align={"center"} mr={4}>
                    <Button
                      ml={3}
                      mt={3}
                      mb={3}
                      size="sm"
                      bgColor={"#34638A"}
                      color={"white"}
                      _hover={{ bgColor: "gray.200", color: "#34638A" }}
                    >
                      Set as default
                    </Button>
                    <FiEdit
                      onClick={() => openEditAddressModal(address)}
                      cursor={"pointer"}
                      color="#34638A"
                      size={25}
                    />
                  </Flex>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default UserAddress;
