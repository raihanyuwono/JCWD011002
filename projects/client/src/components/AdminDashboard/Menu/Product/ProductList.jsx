import React, { useEffect, useState } from 'react'
import { Flex, Box, Button, Table, TableContainer, Thead, Th, Tbody, Tr, Td, Img, } from '@chakra-ui/react'
import axios from 'axios'
const ProductList = () => {
  const [products, setProducts] = useState([])

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/product`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      console.log(data)
      setProducts(data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  return (
    <>
      <Flex flexDirection={"column"} w={"full"} mt={4}>
        <Box>
          <Button bg={"darkBlue"} mb={4} color={"white"} >Create Product</Button>
        </Box>

        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th color={"white"}>Image</Th>
                <Th color={"white"}>Name</Th>
                <Th color={"white"}>Category</Th>
                <Th color={"white"}>Status</Th>
                <Th color={"white"}>Stock</Th>
                <Th color={"white"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {products.map((product) => (
                <Tr key={product.id}>
                  <Td><Img src={`${process.env.REACT_APP_API_BASE_URL}/${product.image}`} boxSize={"70px"} objectFit={"cover"} borderRadius={"5px"} /></Td>
                  <Td>{product.name}</Td>
                  <Td>{product.category.name}</Td>
                  <Td>{product.is_active ? "Active" : "Inactive"}</Td>
                  <Td>{product.product_warehouses.map((warehouse) => warehouse.stock).reduce((a, b) => a + b, 0)}</Td>
                  <Td><Button bg={"darkBlue"} color={"white"}>Detail</Button></Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  )
}

export default ProductList