// OrderBy.jsx
import React from "react";
import { Flex, Select } from "@chakra-ui/react";

const OrderBy = ({ orderBy, setOrderBy }) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  return (
    <Select
      ml={2}
      w={"30vw"}
      color={"black"}
      bg={"white"}
      placeholder="Order By"
      value={orderBy}
      onChange={handleOrderChange}
    >
      <option value="date_asc">DATE : ASC</option>
      <option value="date_desc">DATE : DESC</option>
      <option value="total_asc">TOTAL : ASC</option>
      <option value="total_desc">TOTAL : DESC</option>
    </Select>
  );
};

export default OrderBy;
