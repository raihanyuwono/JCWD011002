import React, { useState } from "react";
import { Flex, Input, Select, Button } from "@chakra-ui/react";
import { MdSaveAs } from "react-icons/md";

const FilterBy = ({ onFilterChange, onDateRangeFilter }) => {
  const [filterValue, setFilterValue] = useState("asc");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterValue(value);
    onFilterChange(value);
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

  return (
    <Flex>
      <Select
        color={"black"}
        bg={"white"}
        placeholder="FILTER BY"
        onChange={handleFilterChange}
        value={filterValue}
      >
        <option value="desc">NEWEST</option>
        <option value="asc">OLDEST</option>
      </Select>
      <Input
        ml={2}
        mr={2}
        placeholder="Start Date"
        size="md"
        type="datetime-local"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <Input
        size="md"
        type="datetime-local"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <Button
        variant={"outline"}
        color={"white"}
        _hover={{ color: "black", bg: "white" }}
        ml={2}
        onClick={handleApplyDateFilter}
      >
        <MdSaveAs size={"80px"} />
      </Button>
    </Flex>
  );
};

export default FilterBy;
