import { Grid, useToast } from "@chakra-ui/react";
import { getCategories } from "../../api/product";
import { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";

const container = {
  templateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  px: ["16px", "8px", "16px", "32px"],
  gap: "16px",
};

function CategoryList() {
  const toast = useToast();
  const [categories, setCategories] = useState([]);

  async function fetchCategories() {
    const { data } = await getCategories(toast);
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <Grid {...container}>
      {categories.map((category, index) => (
        <CategoryCard category={category} key={index} />
      ))}
    </Grid>
  );
}

export default CategoryList;
