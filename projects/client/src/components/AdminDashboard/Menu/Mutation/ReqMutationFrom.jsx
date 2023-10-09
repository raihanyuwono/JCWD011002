import { Table, Tbody, Td, Text, Th, Thead, Tr, useToast, Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ReqMutationFrom = () => {
  const [data, setData] = useState([])
  console.log(data.length)
  const toast = useToast()
  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/stock/pendingwhfrom`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      console.log(data);
      setData(data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const updateStatusMutation = async (id, status) => {
    try {
      await axios.patch(`${process.env.REACT_APP_API_BASE_URL}/stock/${id}`, {
        id_status: status
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      fetchData()
      toast({
        title: "Success",
        description: "Status mutation updated",
        status: "success",
        duration: 3000,
        isClosable: true
      })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <Text my={5} align={"center"}>Request Mutation To Your Warehouse</Text>
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
              <Td display={"flex"} justifyContent={"space-between"} alignItems={"center"}><Text>{item.status.name}</Text>
                <Popover ml={4} placement='bottom-start'>
                  <PopoverTrigger>
                    <Button bg={"darkBlue"} color={"white"}>Change Status</Button>
                  </PopoverTrigger>
                  <PopoverContent bg={"darkBlue"} color={"white"}>
                    <PopoverHeader fontWeight='semibold'>Change Status Mutation</PopoverHeader>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody textAlign={"center"}>
                      <Button color={"white"} onClick={() => updateStatusMutation(item.id, 9)} type='submit' mr={4} bg={"red.500"}>Reject</Button>
                      <Button color={"white"} onClick={() => updateStatusMutation(item.id, 8)} type='submit' ml={4} bg={"green.500"}>Approve</Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover></Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {(!data || data.length) === 0 && <Text align={"center"} my={5}>No data request mutation to your warehouse</Text>}
    </>
  )
}

export default ReqMutationFrom