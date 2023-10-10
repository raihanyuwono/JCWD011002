import React from 'react'
import ReqMutationFrom from './ReqMutationFrom'
import ReqMutationTo from './ReqMutationTo'
import AllMutation from './AllMutation'
import { Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import jwtDecode from 'jwt-decode'
const MutationList = () => {
  const decode = jwtDecode(localStorage.getItem('token'))
  const role = decode.role
  console.log("ini roleee", role)
  return (
    <>
      {/* <Flex direction={"column"} w={"full"}>
        <ReqMutationFrom />
        <Divider my={10} />
        <ReqMutationTo />
        <Divider my={10} />
        <AllMutation />
      </Flex> */}
      <Tabs w={"full"} isFitted variant='enclosed'>
        <TabList>
          {role === "admin warehouse" && <Tab>Mutation To Your Warehouse</Tab>}
          {role === "admin warehouse" && <Tab>Your Request Mutation</Tab>}
          <Tab>All Mutation</Tab>
        </TabList>
        <TabPanels>
          {role === "admin warehouse" &&
            <TabPanel>
              <ReqMutationFrom />
            </TabPanel>
          }
          {role === "admin warehouse" &&
            <TabPanel>
              <ReqMutationTo />
            </TabPanel>
          }
          <TabPanel>
            <AllMutation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default MutationList