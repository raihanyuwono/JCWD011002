import React, { useState } from 'react';
import axios from 'axios'; // Import axios untuk membuat permintaan HTTP
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text,
  Button,
  DrawerHeader,
  DrawerBody,
  Input,
  Table,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  DrawerFooter,
  HStack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { ChevronUpIcon, EditIcon } from '@chakra-ui/icons';

const EditStockDrawer = ({ isOpen, onClose, products, fetchProducts, fetchDetailStock }) => {
  const [quantityToAdd, setQuantityToAdd] = useState(null); // State untuk jumlah yang ingin ditambahkan
  const [selectedWarehouse, setSelectedWarehouse] = useState(null); // State untuk warehouse yang dipilih
  const [selectedProduct, setSelectedProduct] = useState(null); // State untuk produk yang dipilih
  const [stockProduct, setStockProduct] = useState(null); // State untuk stok produk
  const [isReducing, setIsReducing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReduceModalOpen, setIsReduceModalOpen] = useState(false);
  const handleAddModalOpen = (warehouseId, productId, stock) => {
    setIsAddModalOpen(true);
    setSelectedWarehouse(warehouseId);

  }
  console.log("selected warehouse", selectedWarehouse)
  const quantityToAddAsInt = parseInt(quantityToAdd, 10);
  const toast = useToast();
  // Fungsi untuk mengirim permintaan ke backend
  const updateStock = async () => {
    try {
      if (isReducing && quantityToAddAsInt > stockProduct) {
        toast({
          title: 'Failed to reduce stock',
          description: 'The quantity to reduce exceeds the available stock.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return; // Hentikan eksekusi jika input melebihi stok
      }
      // Buat objek data yang berisi informasi yang diperlukan
      const data = {
        productId: selectedProduct,
        warehouseId: selectedWarehouse,
        addition: isReducing ? null : quantityToAddAsInt,
        subtraction: isReducing ? quantityToAddAsInt : null,
      };

      // Kirim permintaan ke backend
      const response = await axios.patch('http://localhost:8000/api/product/stock', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });

      // Tambahkan pemrosesan respons sesuai kebutuhan Anda, misalnya memperbarui tampilan stok produk
      console.log('Respon dari server:', response.data);
      if (response.status === 200) {
        setQuantityToAdd("");
        fetchProducts();
        fetchDetailStock(products.id);
        toast({
          title: 'sucessfully updated stock',
          status: 'success',
          duration: 3000,
          isClosable: true
        })
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'failed to update stock',
        status: 'error',
        duration: 3000,
        isClosable: true
      })
    }
  };

  return (
    <Drawer
      isOpen={isOpen}
      placement='right'
      onClose={onClose}
    >
      <DrawerOverlay />
      <DrawerContent bg={"darkBlue"}>
        <DrawerCloseButton />
        <DrawerHeader>{products?.name}</DrawerHeader>

        <DrawerBody>
          <Text></Text>
          <Accordion defaultIndex={[0]} allowToggle>
            {products?.product_warehouses.map((warehouse, index) => {
              return (
                <AccordionItem key={warehouse.id || index}>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        <Table>
                          <Td>{warehouse?.warehouse?.name}</Td>
                          <Td>{warehouse?.stock} pcs</Td>
                        </Table>
                      </Box>
                      <Button color={"white"}>
                        <AccordionIcon />
                      </Button>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel>
                    <form>
                      <Box display='flex' alignItems='center'>
                        <Text mr={2}>Qty:</Text>
                        <Input
                          placeholder='0'
                          type='number'
                          value={quantityToAdd}
                          onChange={(e) => setQuantityToAdd(e.target.value)}
                        />
                        <Input
                          type='number'
                          value={warehouse?.id_warehouse}
                          style={{ display: 'none' }}
                        />
                        <Input
                          type='number'
                          value={warehouse?.id_product}
                          style={{ display: 'none' }}
                        />
                      </Box>
                      <HStack mt={2}>
                        <Button w={"100%"}
                          colorScheme='red'
                          // onClick={() => {
                          //   // Panggil fungsi updateStock saat pengguna mengklik tombol "reduce"
                          //   const warehouseId = warehouse?.id_warehouse;
                          //   const productId = warehouse?.id_product;
                          //   const stock = warehouse?.stock;
                          //   updateStock(productId, warehouseId, quantityToAdd, true, stock);
                          // }}
                          onClick={() => {
                            setIsReduceModalOpen(true);
                          }}
                        >
                          reduce
                        </Button>
                        <Button w={"100%"}
                          colorScheme='green'
                          // onClick={() => {
                          //   // Panggil fungsi updateStock saat pengguna mengklik tombol "add"
                          //   const warehouseId = warehouse?.id_warehouse;
                          //   const productId = warehouse?.id_product;
                          //   const stock = warehouse?.stock;
                          //   updateStock(productId, warehouseId, quantityToAdd, false, stock);
                          // }}
                          onClick={() => {
                            setSelectedProduct(warehouse?.id_product);
                            setStockProduct(warehouse?.stock);
                            setSelectedWarehouse(warehouse?.id_warehouse);
                            setIsReducing(false)
                            setIsAddModalOpen(true);
                          }}
                        >
                          add
                        </Button>
                      </HStack>
                    </form>
                    <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>

                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Modal title</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <Text>Modal body text goes here.</Text>
                        </ModalBody>
                        <ModalFooter>
                          <Button colorScheme='blue' mr={3} onClick={() => setIsAddModalOpen(false)}>
                            Cancel
                          </Button>
                          <Button variant='ghost'
                            onClick={() => {
                              updateStock();
                              setIsAddModalOpen(false);
                            }}>Yes</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </DrawerBody>



        {/* <DrawerFooter>
          <Button
            variant='outline'
            mr={3}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            colorScheme='blue'
            onClick={() => {
              // Panggil fungsi updateStock di sini jika Anda ingin menyimpan perubahan stok secara keseluruhan
            }}
          >
            Save
          </Button>
        </DrawerFooter> */}
      </DrawerContent>
    </Drawer>
  );
};

export default EditStockDrawer;
