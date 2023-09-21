// OrderBy.jsx
import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({ orderBy, setOrderBy, warehouseId, setWarehouseId }) => {
  const handleOrderChange = (e) => {
    e.stopPropagation();
    setOrderBy(e.target.value);
  };
  const handleWarehouseChange = (e) => {
    e.stopPropagation();
    setWarehouseId(e.target.value);
  };

  return (
    <>
      <Select
        ml={2}
        w={"30vw"}
        color={"black"}
        bg={"white"}
        placeholder="Select Warehouse"
        value={warehouseId}
        onChange={handleWarehouseChange}
      >
        <option value="1">Warehouse Medan</option>
        <option value="2">Warehouse Bandung</option>
        <option value="3">Warehouse Makassar</option>
      </Select>
      <Select
        ml={2}
        w={"30vw"}
        color={"black"}
        bg={"white"}
        placeholder="Order By"
        value={orderBy}
        onChange={handleOrderChange}
      >
        <option value="total_qty_sold asc">TOTAL : ASC</option>
        <option value="total_qty_sold desc">TOTAL : DESC</option>
      </Select>
    </>
  );
};

export default OrderBy;
