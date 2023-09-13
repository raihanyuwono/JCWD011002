import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Text,
  Flex,
  Badge,
  Divider,
  useToast,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import AddAddress from "../components/Order/AddAddress";
import EditAddress from "../components/Order/EditAddress";
import DeleteAddress from "../components/Profile/DeleteAddress";
import { getAddressUser } from "../api/address";

const UserAddress = () => {
  // const [isSelectAddressModalOpen, setIsSelectAddressModalOpen] =
  //   useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditAddressModalOpen, setIsEditAddressModalOpen] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  // const selectAddress = JSON.parse(localStorage.getItem("selectedAddress"));
  const [address, setAddress] = useState([])
  const toast = useToast();
  // const openSelectAddressModal = () => {
  //   setIsSelectAddressModalOpen(true);
  // };

  // const closeSelectAddressModal = () => {
  //   setIsSelectAddressModalOpen(false);
  // };

  const openAddAddressModal = () => {
    setIsAddAddressModalOpen(true);
    // setIsSelectAddressModalOpen(false);
  };

  const closeAddAddressModal = () => {
    setIsAddAddressModalOpen(false);
    // setIsSelectAddressModalOpen(true);
  };

  // const handleSelect = (address) => {
  //   setSelectedAddress(address);
  //   localStorage.setItem("selectedAddress", JSON.stringify(address));
  //   localStorage.setItem("city_name", address.city_name);
  //   localStorage.setItem("myLatitude", address.latitude);
  //   localStorage.setItem("myLongitude", address.longitude);
  //   closeSelectAddressModal();
  // };

  const handleAddAddress = (formData) => {
    console.log("Adding address:", formData);
    closeAddAddressModal();
  };

  const openEditAddressModal = (address) => {
    console.log('address from openEditAddressModal', address)
    setEditAddressData(address);
    setIsEditAddressModalOpen(true);
    // setIsSelectAddressModalOpen(false);
  };

  const closeEditAddressModal = () => {
    setIsEditAddressModalOpen(false);
    // setIsSelectAddressModalOpen(true);
  };

  const handleEditAddress = (formData) => {
    console.log("Editing address:", formData);
    closeEditAddressModal();
  };

  const fetchAddressUser = async () => {
    await getAddressUser(toast, setAddress)
  }
  useEffect(() => {
    fetchAddressUser()
  }, [])
  return (
    <Box w={"full"}>
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
            {address.length === 0 ? (
              <Text align={"center"} color={"white"}>
                No Address Found!
              </Text>
            ) : (
              address.map((address) => (
                <Box bgColor={"white"} color={"#34638A"} boxShadow={"xl"} borderRadius={"5px"} mt={3} key={address.id}>
                  <Flex flexDirection={"column"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} mr={5}>
                      <Text px={3} py={2} fontSize={"md"} fontWeight={"bold"}>
                        {address.name}&nbsp;
                        {address.is_default && (
                          <Badge colorScheme="green">Default</Badge>
                        )}
                      </Text>
                      <DeleteAddress addressData={address} />
                    </Flex>
                    <Divider />
                    <Text color={"#34638A"} px={3} mt={1} fontSize={"lg"} fontWeight={"bold"}>
                      {address.user.name}
                    </Text>
                    <Text px={3} fontSize={"sm"}>{address.user.phone}</Text>
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
