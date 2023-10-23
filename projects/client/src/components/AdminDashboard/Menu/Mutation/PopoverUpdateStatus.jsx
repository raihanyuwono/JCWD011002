import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverArrow, PopoverCloseButton, PopoverBody, Button } from '@chakra-ui/react'
import React from 'react'

const PopoverUpdateStatus = ({ approve, reject }) => {
  return (
    <Popover ml={4} placement='bottom-start'>
      <PopoverTrigger>
        <Button bg={"primary"} color={"white"}>Change Status</Button>
      </PopoverTrigger>
      <PopoverContent bg={"secondary"} color={"white"}>
        <PopoverHeader fontWeight='semibold'>Change Status Mutation</PopoverHeader>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverBody textAlign={"center"}>
          <Button color={"white"} onClick={reject} type='submit' mr={4} bg={"red.500"}>Reject</Button>
          <Button color={"white"} onClick={approve} type='submit' ml={4} bg={"green.500"}>Approve</Button>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export default PopoverUpdateStatus