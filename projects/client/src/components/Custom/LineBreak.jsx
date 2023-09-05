import { Box, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const LineBreak = ({ data, mt, mb }) => {
  return (
    <>
      <Flex mt={mt} mb={mb} justifyContent={'center'} alignContent={'center'} alignItems="center">
        <Box borderBottom="2px solid" borderColor="black" width="50%" mx={4} my={2}></Box>
        <Text align={'center'} fontSize="lg" fontWeight="bold">
          {data}
        </Text>
        <Box borderBottom="2px solid" borderColor="black" width="50%" mx={4} my={2}></Box>
      </Flex>
    </>
  )
}

export default LineBreak