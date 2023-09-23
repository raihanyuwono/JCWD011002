import React, { useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Summary from "./Summary/Summary";
import Detail from "./Detail/Detail";

const Stock = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleSliderChange = (event) => {
    setTabIndex(parseInt(event.target.value, 10));
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
  };

  return (
    <>
      <input
        style={{
          border: "10px solid white",
        }}
        type="range"
        min="0"
        max="1"
        value={tabIndex}
        onChange={handleSliderChange}
      />

      <Tabs
        defaultIndex={1}
        isLazy
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Summary</Tab>
          <Tab>Detail</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Summary />
          </TabPanel>
          <TabPanel>
            <Detail />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Stock;
