import React from "react";
import CategoryCard from "../components/Card/CategoryCard";
import { Flex } from "@chakra-ui/react";
import LineBreak from "../components/Custom/LineBreak";
import ProductList from "../components/Homepage/ProductList";

const container = {
  direction: "column",
  w: "full",
  pos: "relative",
  gap: "16px",
  py: "16px",
};

const HomePage = () => {
  return (
    <Flex {...container}>
      <LineBreak data="Category" />
      <CategoryCard />
      <LineBreak data="Product" />
      <ProductList />
    </Flex>
  );
};

export default HomePage;
