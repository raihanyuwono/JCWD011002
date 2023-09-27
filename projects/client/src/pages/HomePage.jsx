import React from "react";
import ProductCard from "../components/Card/ProductCard";
import CategoryCard from "../components/Card/CategoryCard";
import { Box } from "@chakra-ui/react";
import LineBreak from "../components/Custom/LineBreak";
import ProductList from "../components/Homepage/ProductList";

const HomePage = () => {
  return (
    <Box w={"full"}>
      <LineBreak data="Category" mt={10} mb={10} />
      <CategoryCard />
      <LineBreak data="Product" mt={20} mb={10} />
      {/* <ProductCard /> */}
      <ProductList />
    </Box>
  );
};

export default HomePage;
