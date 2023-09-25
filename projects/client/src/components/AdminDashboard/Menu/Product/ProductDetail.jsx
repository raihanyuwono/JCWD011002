import React from 'react';
import { Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Box, Image, Text, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Button, Tr, Td, Table } from '@chakra-ui/react';

const DetailProduct = ({ isOpen, onClose, product }) => {
  console.log("product detail", product?.name);
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent bg={"darkBlue"} color={"white"}>
        <DrawerCloseButton />
        <DrawerHeader>Product Details</DrawerHeader>
        <DrawerBody>
          <Box>
            <Image src={`${process.env.REACT_APP_API_BASE_URL}/${product?.image}`} boxSize="150px" objectFit="cover" borderRadius="5px" />
          </Box>
          <Box mt={4}>
            <Text>Name: {product?.name}</Text>
            <Text>Description: {product?.description}</Text>
            <Text>Category: {product?.category.name}</Text>
            <Text>Status: {product?.is_active ? "Active" : "Inactive"}</Text>
            <Text>Price: {product?.price}</Text>
            <Text>Total Stock: {product?.product_warehouses.map((warehouse) => warehouse?.stock).reduce((a, b) => a + b, 0)}</Text>
            <Accordion allowToggle mt={2} mb={20}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      Stock Details
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  {product?.product_warehouses.map((warehouse) => {
                    return <Box key={warehouse.id}>
                      <Text>{warehouse?.warehouse?.name}</Text>
                      <Text>{warehouse?.stock}</Text>
                    </Box>
                  })}
                  <Button mt={2} mb={4} colorScheme='blue'>update stock</Button>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
            {/* <Text>Detail Stock: {product.product_warehouses.map((warehouse) => {
              return <Box key={warehouse.id}>
                <Text>{warehouse?.warehouse?.name}</Text>
                <Text>{warehouse?.stock}</Text>
              </Box>
            })}</Text> */}
            {/* Add more details as needed */}
          </Box>
          <Box w={"85%"} position={"fixed"} bottom={0} bg={"darkBlue"} color={"white"} py={4}>
            <Button w={"full"} mb={2} colorScheme='green'>Edit</Button>
            <Button w={"full"} colorScheme='red' onClick={onClose}>Cancel</Button>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DetailProduct;
