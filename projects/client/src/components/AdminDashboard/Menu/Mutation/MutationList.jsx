import React from 'react'
import ReqMutationFrom from './ReqMutationFrom'
import ReqMutationTo from './ReqMutationTo'
import AllMutation from './AllMutation'
import { Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'

const MutationList = () => {
  return (
    <>
      {/* <Flex direction={"column"} w={"full"}>
        <ReqMutationFrom />
        <Divider my={10} />
        <ReqMutationTo />
        <Divider my={10} />
        <AllMutation />
      </Flex> */}
      <Tabs w={"full"}>
        <TabList>
          <Tab>Mutation To Your Warehouse</Tab>
          <Tab>Your Request Mutation</Tab>
          <Tab>All Mutation</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ReqMutationFrom />
          </TabPanel>
          <TabPanel>
            <ReqMutationTo />
          </TabPanel>
          <TabPanel>
            <AllMutation />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default MutationList