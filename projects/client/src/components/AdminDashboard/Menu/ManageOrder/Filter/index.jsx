import { Flex } from "@chakra-ui/react";
import FilterWarehouse from "./FilterWarehouse";
import Searchbar from "./Searchbar";
import FilterDate from "./FilterDate";
import FilterSort from "./FilterSort";

const container = {
  direction: "row",
  gap: "8px",
  alignItems: "center",
  alignSelf: "flex-end",
};

function Filter() {
  return (
    <Flex {...container}>
      <FilterWarehouse />
      <FilterDate />
      <Searchbar />
      <FilterSort />
    </Flex>
  );
}

export default Filter;
