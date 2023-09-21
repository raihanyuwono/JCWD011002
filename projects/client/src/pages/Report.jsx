import React from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import Sales from "../components/Report/Sales/Sales";
const Report = () => {
  return (
    <>
      <Tabs isLazy isFitted w={"82vw"} variant="enclosed">
        <TabList mb="1em">
          <Tab>Sales Report</Tab>
          <Tab>Stock History</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Sales />
          </TabPanel>
          <TabPanel>
            <p>Stock</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Report;
