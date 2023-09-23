import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";
import axios from "axios";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  transactionId,
  setTransactionId,
  warehouseFrom,
  setWarehouseFrom,
  warehouseTo,
  setWarehouseTo,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  const handleSearchChange = (e) => {
    setTransactionId(e.target.value);
  };

  const handleWarehouseFrom = (e) => {
    setWarehouseFrom(e.target.value);
  };

  const handleWarehouseTo = (e) => {
    setWarehouseTo(e.target.value);
  };

  const fetchWarehouse = async () => {
    try {
      const response = await axios.get(`${API_URL}/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDataWarehouse(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  return (
    <>
      <Box>
        <Stack>
          <InputGroup>
            <Input
              value={transactionId}
              onChange={handleSearchChange}
              color={"black"}
              bg={"white"}
              placeholder="Search TXN ID"
            />
            <InputRightElement>
              <Search2Icon color="primary" />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Warehouse From"
        value={warehouseFrom}
        onChange={handleWarehouseFrom}
      >
        {dataWarehouse.map((warehouse) => (
          <option key={warehouse.id} value={warehouse.id}>
            {warehouse.name}
          </option>
        ))}
      </Select>
      <Select
        ml={2}
        w={"15vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Warehouse To"
        value={warehouseTo}
        onChange={handleWarehouseTo}
      >
        {dataWarehouse.map((wh) => (
          <option key={wh.id} value={wh.id}>
            {wh.name}
          </option>
        ))}
      </Select>
      <Select
        ml={2}
        w={"10vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Product"
        value={productId}
        onChange={handleProductChange}
      >
        <option value="1">Seagate 1TB</option>
        <option value="2">RTX 3090</option>
        <option value="3">Samsung Curve Monitor</option>
        <option value="4">AMD Radeon Supra X</option>
      </Select>
      <Select
        ml={2}
        w={"10vw"}
        color={"black"}
        bg={"white"}
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="desc">Sort By</option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
