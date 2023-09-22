import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({
  orderBy,
  setOrderBy,
  productId,
  setProductId,
  warehouseId,
  setWarehouseId,
}) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleWarehouseChange = (e) => {
    setWarehouseId(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
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
        placeholder="All Product"
        value={productId}
        onChange={handleProductChange}
      >
        <option value="1">Seagate 1TB</option>
        <option value="2">RTX 3090</option>
        <option value="3">Samsung Curve Monitor</option>
        <option value="3">AMD Radeon Supra X</option>
      </Select>
      <Select
        ml={2}
        w={"20vw"}
        color={"black"}
        bg={"white"}
        placeholder="Order By"
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
