import {
  Box,
  TabList,
  TabPanel,
  Tab,
  Tabs,
  TabPanels,
  Text,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import Pagination from "../components/Transaction/Pagination";
import ToPay from "../components/Transaction/ToPay";
import ToConfirm from "../components/Transaction/ToConfirm";
import Processed from "../components/Transaction/Processed";
import Shipped from "../components/Transaction/Shipped";
import Completed from "../components/Transaction/Completed";
import Cancelled from "../components/Transaction/Cancelled";
import AllStatus from "../components/Transaction/AllStatus";

const TransactionList = () => {
  return (
    <Box>
      <Tabs w={"70vw"} isFitted variant="enclosed">
        <TabList color={"white"} h={"3em"} mb="1em">
          <Tab>All</Tab>
          <Tab>To Pay</Tab>
          <Tab>To Confirm</Tab>
          <Tab>Processed</Tab>
          <Tab>Shipped</Tab>
          <Tab>Completed</Tab>
          <Tab>Cancelled</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AllStatus />
          </TabPanel>
          <TabPanel>
            <ToPay />
          </TabPanel>
          <TabPanel>
            <ToConfirm />
          </TabPanel>
          <TabPanel>
            <Processed />
          </TabPanel>
          <TabPanel>
            <Shipped />
          </TabPanel>
          <TabPanel>
            <Completed />
          </TabPanel>
          <TabPanel>
            <Cancelled />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Pagination />
    </Box>
  );
};

export default TransactionList;
