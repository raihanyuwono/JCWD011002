import React, { useState } from "react";
import { Flex, Input, Select, Button } from "@chakra-ui/react";
import { MdSaveAs } from "react-icons/md";
import { extendTheme, useMediaQuery } from "@chakra-ui/react";

const FilterBy = ({ onFilterChange, onDateRangeFilter }) => {
  const [filterValue, setFilterValue] = useState("desc");
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

  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");


  return (
    <Flex px={isMd ? 2 : 0} ml={isMd ? 0 : 2}>
      <Select
        color={"black"}
        bg={"white"}
        placeholder="FILTER BY"
        onChange={handleFilterChange}
        value={filterValue}
      >
        <option value="desc">DATE : NEWEST</option>
        <option value="asc">DATE : OLDEST</option>
      </Select>
      <Input
        bg={"white"}
        color={"black"}
        ml={2}
        mr={2}
        placeholder="Start Date"
        size="md"
        type="datetime-local"
        value={startDate}
        onChange={handleStartDateChange}
      />
      <Input
        bg={"white"}
        color={"black"}
        size="md"
        type="datetime-local"
        placeholder="End Date"
        value={endDate}
        onChange={handleEndDateChange}
      />
      <Button
        variant={"outline"}
        color={"black"}
        fontSize={"md"}
        bg={"white"}
        _hover={{ color: "white", bg: "black" }}
        ml={2}
        w={"7vw"}
        onClick={handleApplyDateFilter}
      >
        Apply
      </Button>
    </Flex>
  );
};

export default FilterBy;
