import { Box, TabList, TabPanel, Tab, Tabs, TabPanels } from "@chakra-ui/react";
import React from "react";

const TransactionList = () => {
  return (
    <Box mt={20}>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>All</Tab>
          <Tab>Menunggu Pembayaran</Tab>
          <Tab>Menunggu Konfirmasi Pembayaran</Tab>
          <Tab>Diproses</Tab>
          <Tab>Dikirim</Tab>
          <Tab>Pesanan Dikonfirmasi</Tab>
          <Tab>Dibatalkan</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Semua!</p>
          </TabPanel>
          <TabPanel>
            <p>Menunggu Pembayaran!</p>
          </TabPanel>
          <TabPanel>
            <p>Menunggu Konfirmasi Pembayaran!</p>
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
    </Box>
  );
};

export default TransactionList;
