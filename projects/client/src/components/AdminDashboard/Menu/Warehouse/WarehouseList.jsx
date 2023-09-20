import {
  Button,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Select,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { getWarehouses, updateWarehouse } from "../../../../api/warehouse";
import axios from "axios";
import { getCityByProvince, getProvince } from "../../../../api/address";

const WarehouseList = () => {
  const [warehouses, setWarehouses] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWarehouse, setSelectedWarehouse] = useState(null);
  const [editedWarehouse, setEditedWarehouse] = useState({
    name: "",
    address: "",
    province: "",
    city_name: "",
    postal_code: "",
  }); // State untuk menyimpan data yang akan diubah
  const toast = useToast();
  const [city, setCity] = useState([]);
  const [province, setProvince] = useState([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState("");
  const [selectedProvinceName, setSelectedProvinceName] = useState("");
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
  }, [])
  useEffect(() => {
    fetchCity();
  }, [selectedProvinceId])

  useEffect(() => {
    if (editedWarehouse.province) {
      const selectedProvince = province.find(
        (p) => p.province === editedWarehouse.province
      );

      if (selectedProvince) {
        setSelectedProvinceId(selectedProvince.province_id);
        setSelectedProvinceName(selectedProvince.province);
      }
    }
  }, [province, editedWarehouse]);


  const handleSelectProvince = (e) => {
    const selectedId = e.target.value;
    const selectedName = e.target.options[e.target.selectedIndex].text;
    setSelectedProvinceId(selectedId);
    setSelectedProvinceName(selectedName);
    // setCity([]);
  }

  const fetchWarehouses = async () => {
    const { data } = await getWarehouses(toast);
    setWarehouses(data);
  };

  const openEditDrawer = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setEditedWarehouse(warehouse);
    setIsDrawerOpen(true);
  };

  const closeEditDrawer = () => {
    setSelectedWarehouse(null);
    setIsDrawerOpen(false);
  };

  const handleEditWarehouse = async () => {
    try {
      const updatedData = {
        ...editedWarehouse,
        province: selectedProvinceName,
      };
      await axios.patch(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/${selectedWarehouse.id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      toast({
        title: "Warehouse Updated",
        description: "Warehouse data has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      fetchWarehouses();
      closeEditDrawer();
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred while updating the warehouse data.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    fetchWarehouses();
  }, []);

  const openDeleteModal = (warehouse) => {
    setSelectedWarehouse(warehouse);
    setIsDeleteModalOpen(true);
  }
  const closeDeleteModal = () => {
    setSelectedWarehouse(null);
    setIsDeleteModalOpen(false);
  }

  const handleDeleteWarehouse = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/warehouse/${selectedWarehouse.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
      )
      toast({
        title: "Warehouse Deleted",
        description: "Warehouse data has been deleted successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })
      fetchWarehouses();
      closeDeleteModal();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {/* Table content */}
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th color={"white"}>Warehouse</Th>
              <Th color={"white"}>Address</Th>
              <Th color={"white"}>Province</Th>
              <Th color={"white"}>City</Th>
              <Th color={"white"}>Postal Code</Th>
              <Th color={"white"}>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {warehouses.map((warehouse) => (
              <Tr key={warehouse.id}>
                <Td>{warehouse.name}</Td>
                <Td>{warehouse.address}</Td>
                <Td>{warehouse.province}</Td>
                <Td>{warehouse.city_name}</Td>
                <Td>{warehouse.postal_code}</Td>
                <Td>
                  <Button onClick={() => openEditDrawer(warehouse)}>Edit</Button>
                  <Button onClick={() => openDeleteModal(warehouse)}>delete</Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>

      {/* Edit Drawer */}
      <Drawer isOpen={isDrawerOpen} onClose={closeEditDrawer}>
        <DrawerOverlay>
          <DrawerContent bg={"darkBlue"} color={"white"}>
            <DrawerCloseButton />
            <DrawerHeader>Edit Warehouse</DrawerHeader>
            <DrawerBody>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleEditWarehouse();
                }}
              >
                <Input my={2}
                  placeholder="Name"
                  value={editedWarehouse.name}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      name: e.target.value,
                    })
                  }
                />
                <Input my={2}
                  placeholder="Address"
                  value={editedWarehouse.address}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      address: e.target.value,
                    })
                  }
                />
                <Select my={2} placeholder={editedWarehouse.province} name="province" value={selectedProvinceId} onChange={handleSelectProvince}>
                  {province.map((province) => (
                    <option key={province.province_id} value={province.province_id}>{province.province}</option>
                  ))}
                </Select>
                <Select my={4} isDisabled={!selectedProvinceId} placeholder={selectedProvinceId ? "select city" : editedWarehouse.city_name} name="city_name" value={editedWarehouse.city_name} onChange={(e) => setEditedWarehouse({ ...editedWarehouse, city_name: e.target.value })} >
                  {city.map((city) => (
                    <option style={{ color: "white" }} key={city.city_id} value={city.city_name}>{city.city_name}</option>
                  ))}
                </Select>
                <Input mb={4}
                  placeholder="Postal Code"
                  value={editedWarehouse.postal_code}
                  onChange={(e) =>
                    setEditedWarehouse({
                      ...editedWarehouse,
                      postal_code: e.target.value,
                    })
                  }
                />
                <Box w={"85%"} position={"absolute"} bottom={0}>
                  <Button w={"full"} colorScheme="green" mb={3} type="submit">Save</Button>
                  <br />
                  <Button w={"full"} mb={3} onClick={closeEditDrawer}>Cancel</Button>
                </Box>
              </form>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer >
      {/* Delete Modal */}
      < Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal} >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Warehouse</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this warehouse?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteWarehouse}>
              Delete
            </Button>
            <Button variant="ghost" onClick={closeDeleteModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal >
    </>
  );
};

export default WarehouseList;
