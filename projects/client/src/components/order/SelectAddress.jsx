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
  // Add more dummy addresses here
];

const AddressList = ({ onSelectAddress }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelect = (address) => {
    setSelectedAddress(address);
    console.log(address);
    closeModal();
  };

  return (
    <Box>
      <Button
        size="md"
        variant={"outline"}
        colorScheme="blue"
        onClick={openModal}
      >
        Select Address
      </Button>
      <Modal size={"2xl"} isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select an Address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              {dummyAddress.map((address) => (
                <Text
                  boxShadow={"xl"}
                  borderRadius={"5px"}
                  mt={4}
                  key={address.id}
                >
                  <Flex flexDirection={"column"}>
                    <Text px={2} py={1} fontSize={"md"} fontWeight={"bold"}>
                      {address.name}
                      &nbsp;&nbsp;
                      {address.is_default && (
                        <Badge colorScheme="green">Default</Badge>
                      )}
                    </Text>
                    <Divider />
                    <Text px={2} mt={1} fontSize={"lg"} fontWeight={"bold"}>
                      {address.id_user}
                    </Text>
                    <Text px={2} fontSize={"sm"}>
                      {address.full_address}, {address.city_name},{" "}
                      {address.province}, {address.postal_code}
                    </Text>
                  </Flex>
                  <Button
                    ml={2}
                    mt={2}
                    mb={2}
                    onClick={() => handleSelect(address)}
                    size="sm"
                    bgColor={"#34638A"}
                    color={"white"}
                    _hover={{ bgColor: "gray.200", color: "#34638A" }}
                  >
                    Select
                  </Button>
                </Text>
              ))}
            </Box>
          </ModalBody>
          <ModalFooter>
            {/* <Button onClick={closeModal} variant="outline">
              Close
            </Button> */}
          </ModalFooter>
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

export default AddressList;
