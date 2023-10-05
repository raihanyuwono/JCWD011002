import React, { useState } from "react";
import {
  Box,
  TabList,
  TabPanel,
  Tab,
  Tabs,
  TabPanels,
  Text,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import Pagination from "../components/Transaction/Pagination";
import ToPay from "../components/Transaction/Status/ToPay";
import ToConfirm from "../components/Transaction/Status/ToConfirm";
import Processed from "../components/Transaction/Status/Processed";
import Shipped from "../components/Transaction/Status/Shipped";
import Completed from "../components/Transaction/Status/Completed";
import Cancelled from "../components/Transaction/Status/Cancelled";
import AllStatus from "../components/Transaction/Status/AllStatus";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const TransactionList = () => {
  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  const [selectedStatus, setSelectedStatus] = useState("all");

  const tab = {
    fontSize: isMd ? "sm" : "md",
  };
  const tabPanel = {
    w: isMd ? "107vw" : "",
  };

  return (
    <>
      {isMd ? (
        <Flex direction={"column"}>
          <Menu>
            <MenuButton
              w={isMd ? "100vw" : ""}
              color={"white"}
              borderRadius={"none"}
              _hover={{ color: "black", bg: "gray" }}
              as={Button}
              bg="#2D2D2D"
            >
              Select Status
            </MenuButton>
            <MenuList minWidth="240px">
              <MenuOptionGroup
                color={"black"}
                defaultValue="all"
                title="Order Status"
                type="radio"
                onChange={(value) => setSelectedStatus(value)}
              >
                <MenuItemOption color={"black"} value="all">
                  All Status
                </MenuItemOption>
                <MenuItemOption color={"black"} value="toPay">
                  To Pay
                </MenuItemOption>
                <MenuItemOption color={"black"} value="toConfirm">
                  To Confirm
                </MenuItemOption>
                <MenuItemOption color={"black"} value="processed">
                  Processed
                </MenuItemOption>
                <MenuItemOption color={"black"} value="shipped">
                  Shipped
                </MenuItemOption>
                <MenuItemOption color={"black"} value="completed">
                  Completed
                </MenuItemOption>
                <MenuItemOption color={"black"} value="cancelled">
                  Cancelled
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Pagination />
          <Box w={isMd ? "100vw" : ""}>
            {selectedStatus === "all" && <AllStatus />}
            {selectedStatus === "toPay" && <ToPay />}
            {selectedStatus === "toConfirm" && <ToConfirm />}
            {selectedStatus === "processed" && <Processed />}
            {selectedStatus === "shipped" && <Shipped />}
            {selectedStatus === "completed" && <Completed />}
            {selectedStatus === "cancelled" && <Cancelled />}
          </Box>
        </Flex>
      ) : (
        <>
          <Tabs
            colorScheme="white"
            isLazy
            w={isMd ? "100vw" : "70vw"}
            isFitted
            variant="enclosed"
          >
            <TabList color={"white"} h={"3em"} mb="1em">
              <Tab {...tab}>All Status</Tab>
              <Tab {...tab}>To Pay</Tab>
              <Tab {...tab}>To Confirm</Tab>
              <Tab {...tab}>Processed</Tab>
              <Tab {...tab}>Shipped</Tab>
              <Tab {...tab}>Completed</Tab>
              <Tab {...tab}>Cancelled</Tab>
            </TabList>
            <TabPanels
              justifyContent={"center"}
              display={"flex"}
              alignItems={"center"}
            >
              <TabPanel {...tabPanel}>
                <AllStatus />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <ToPay />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <ToConfirm />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Processed />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Shipped />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Completed />
              </TabPanel>
              <TabPanel {...tabPanel}>
                <Cancelled />
              </TabPanel>
            </TabPanels>
          </Tabs>
          <Pagination />
        </>
      )}
    </>
  );
};

export default TransactionList;
