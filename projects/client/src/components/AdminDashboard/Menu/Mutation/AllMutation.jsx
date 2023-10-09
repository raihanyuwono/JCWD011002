import { Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const AllMutation = () => {
  const [data, setData] = useState([])
  console.log("all mutaion:", data)
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(data);
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Text align={"center"} my={5}>All Mutation</Text>
      <Table>
        <Thead bg={"darkBlue"}>
          <Tr>
            <Th color={"white"}>No</Th>
            <Th color={"white"}>Admin</Th>
            <Th color={"white"}>From Warehouse</Th>
            <Th color={"white"}>To Warehouse</Th>
            <Th color={"white"}>Product</Th>
            <Th color={"white"}>Qty</Th>
            <Th color={"white"}>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, index) => (
            <Tr key={item.id}>
              <Td>{index + 1}</Td>
              <Td>{item.user?.name}</Td>
              <Td>{item._warehouse_from.name}</Td>
              <Td>{item._warehouse_to.name}</Td>
              <Td>{item.product.name}</Td>
              <Td>{item.qty}</Td>
              <Td>{item.status.name}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(!data || data.length) === 0 && <Text align={"center"} my={5}>No data mutation</Text>}
    </>
  )
}

export default AllMutation