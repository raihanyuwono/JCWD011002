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
import ToPay from "../components/Transaction/Status/ToPay";
import ToConfirm from "../components/Transaction/Status/ToConfirm";
import Processed from "../components/Transaction/Status/Processed";
import Shipped from "../components/Transaction/Status/Shipped";
import Completed from "../components/Transaction/Status/Completed";
import Cancelled from "../components/Transaction/Status/Cancelled";
import AllStatus from "../components/Transaction/Status/AllStatus";

const TransactionList = () => {
  return (
    <>
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
        <TabPanels
          justifyContent={"center"}
          display={"flex"}
          alignItems={"center"}
        >
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
    </>
  );
};

export default TransactionList;
