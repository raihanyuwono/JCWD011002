import React, { useState } from "react";
import { Select } from "@chakra-ui/react";

const FilterBy = ({ onFilterChange }) => {
  const [filterValue, setFilterValue] = useState("asc");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
  };

  return (
    <Select
      color={"black"}
      bg={"white"}
      placeholder="Filter by"
      onChange={handleFilterChange}
      value={filterValue}
    >
      <option value="desc">Date A - Z</option>
      <option value="asc">Date Z - A</option>
    </Select>
  );
};

export default FilterBy;
