import React from "react";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const OrderBy = ({ orderBy, setOrderBy, productId, setProductId }) => {
  const handleOrderChange = (e) => {
    setOrderBy(e.target.value);
  };

  const handleProductChange = (e) => {
    setProductId(e.target.value);
  };

  return (
    <>
      <Box>
        <Stack>
          <InputGroup>
            <Input color={"black"} bg={"white"} placeholder="Search TXN ID" />
            <InputRightElement>
              <Search2Icon color="primary" />
            </InputRightElement>
          </InputGroup>
        </Stack>
      </Box>
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
    </>
  );
};

export default OrderBy;
