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
            <Text>Semua!</Text>
          </TabPanel>
          <TabPanel>
            <ToPay />
          </TabPanel>
          <TabPanel>
            <ToConfirm />
          </TabPanel>
          <TabPanel>
            <p>Diproses!</p>
          </TabPanel>
          <TabPanel>
            <p>Dikirim</p>
          </TabPanel>
          <TabPanel>
            <p>Pesanan Dikonfirmasi</p>
          </TabPanel>
          <TabPanel>
            <p>Dibatalkan!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Pagination />
    </Box>
  );
};

export default TransactionList;
