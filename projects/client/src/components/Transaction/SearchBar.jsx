import React, { useState } from "react";
import { Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  const handleKeyboard = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Stack spacing={4}>
      <InputGroup>
        <Input
          bgColor={"white"}
          color={"black"}
          onKeyDown={handleKeyboard}
          placeholder="Search by product name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputRightElement>
          <SearchIcon color="black" onClick={handleSearch} />
        </InputRightElement>
      </InputGroup>
    </Stack>
  );
};

export default SearchBar;
