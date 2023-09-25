import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { Search2Icon, CalendarIcon } from "@chakra-ui/icons";
import axios from "axios";
import jwt_decode from "jwt-decode";

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
  onDateRangeFilter,
}) => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [dataWarehouse, setDataWarehouse] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const decode = jwt_decode(localStorage.getItem("token"));
  const role = decode.role;
  const [wh, setWh] = useState("");

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

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
  };

  const handleApplyDateFilter = () => {
    const formattedStartDate = startDate.replace("T", " ").substring(0, 16);
    const formattedEndDate = endDate.replace("T", " ").substring(0, 16);
    onDateRangeFilter(formattedStartDate, formattedEndDate);
  };

  const fetchWHAdmin = async () => {
    try {
      const response = await axios.get(`${API_URL}/admin/roles/warehouse`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setWh(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWHAdmin();
    if (role === "admin warehouse" && wh.id_warehouse) {
      setWarehouseFrom(wh.id_warehouse);
    } else {
      setWarehouseFrom("");
    }
  }, [role, wh, setWarehouseFrom]);

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
      {/* <Select
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
      </Select> */}
      {role === "admin warehouse" ? (
        <Select
          ml={2}
          w={"15vw"}
          color={"black"}
          bg={"white"}
          value={warehouseFrom}
          onChange={handleWarehouseFrom}
          disabled={true}
        >
          <option value={wh.id_warehouse}>{wh.warehouse_name}</option>
        </Select>
      ) : (
        <Select
          ml={2}
          w={"15vw"}
          color={"black"}
          bg={"white"}
          placeholder="All Warehouse"
          value={warehouseFrom}
          onChange={handleWarehouseFrom}
        >
          {dataWarehouse.map((warehouse) => (
            <option key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </option>
          ))}
        </Select>
      )}
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
      <Box>
        <Popover placement="top-start">
          <PopoverTrigger>
            <ButtonGroup ml={2} size="sm" isAttached variant="outline">
              <Button
                fontSize={"md"}
                w={"10vw"}
                h={10}
                borderRadius={6}
                bg={"white"}
                color={"black"}
                fontWeight={"medium"}
              >
                Date Filter
              </Button>
              <IconButton
                h={10}
                bg={"white"}
                borderRadius={6}
                color={"black"}
                icon={<CalendarIcon />}
              />
            </ButtonGroup>
          </PopoverTrigger>
          <PopoverContent color="black">
            <PopoverHeader fontWeight="semibold">
              Filter by Date Range
            </PopoverHeader>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <Text>Start Date:</Text>
              <Input
                placeholder="Start Date"
                size="md"
                type="datetime-local"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Text mt={4}>End Date:</Text>
              <Input
                mb={1}
                placeholder="End Date"
                size="md"
                type="datetime-local"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </PopoverBody>
            <PopoverFooter align={"right"}>
              <Button
                size={"sm"}
                border={"1px solid black"}
                variant={"outline"}
                onClick={handleApplyDateFilter}
              >
                Apply
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>
    </>
  );
};

export default OrderBy;
