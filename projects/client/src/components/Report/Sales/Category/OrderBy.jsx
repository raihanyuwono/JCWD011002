import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({
  orderBy,
  setOrderBy,
  warehouseId,
  setWarehouseId,
  categoryId,
  setCategoryId,
}) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };
  const handleWarehouseChange = (e) => {
    setWarehouseId(e.target.value);
  };
  const handleCategoryChange = (e) => {
    setCategoryId(e.target.value);
  };

  return (
    <>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Warehouse"
        value={warehouseId}
        onChange={handleWarehouseChange}
      >
        <option value="1">Warehouse Medan</option>
        <option value="2">Warehouse Bandung</option>
        <option value="3">Warehouse Makassar</option>
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="All Categories"
        value={categoryId}
        onChange={handleCategoryChange}
      >
        <option value="1">SSD</option>
        <option value="2">VGA</option>
        <option value="3">Monitor</option>
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="Sort By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="total_qty_sold asc">TOTAL : ASC</option>
        <option value="total_qty_sold desc">TOTAL : DESC</option>
        <option value="month_year asc">DATE : ASC</option>
        <option value="month_year desc">DATE : DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
