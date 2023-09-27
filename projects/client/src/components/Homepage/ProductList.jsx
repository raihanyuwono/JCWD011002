import { Grid, useToast } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../api/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Pagination from "../Utility/Pagination";
import { useSearchParams } from "react-router-dom";

const container = {
  templateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  px: ["16px", "8px", "16px", "32px"],
  gap: "16px",
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const [maxPage, setMaxPage] = useState(1);
  const [searchPageParams, setCurrentPage] = useSearchParams({ page: 1 });
  const search = useSelector((state) => state.search.products);
  const toast = useToast();
  const currentPage = searchPageParams.get("page");

  const paginationAttr = {
    maxPage,
    currentPage,
    setCurrentPage,
  };

  async function fetchProducts() {
    const attributes = {
      search,
      page: currentPage,
    };
    const { data } = await getProducts(toast, attributes);
    const { products: productList, pages } = data;
    setMaxPage(pages);
    setProducts(productList);
  }

  useEffect(() => {
    fetchProducts();
  }, [search, currentPage]);

  useEffect(() => {
    setCurrentPage((prev) => {
      prev.set("page", 1);
      return prev;
    });
  }, [search]);

  return (
    <>
      <Grid {...container}>
        {products.map((product, index) => (
          <ProductCard product={product} key={index} />
        ))}
      </Grid>
      <Pagination {...paginationAttr} />
    </>
  );
}

export default ProductList;
