import { Grid, useToast } from "@chakra-ui/react";
import ProductCard from "./ProductCard";
import { getProducts } from "../../api/product";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const dummy = [
  {
    id: 1,
    name: "Zifriend ZA68 - Hyacinth",
    price: 399000,
    description: "ZIFRIEND ZA68 RGB Hotswap Mechanical Keyboard",
    image:
      "https://images.tokopedia.net/img/cache/500-square/VqbcmM/2023/5/26/c4ace32b-dcbc-4a29-8ca2-44e11fb79a0c.jpg.webp?ect=4g",
    is_active: true,
    category: {
      name: "Keyboard",
    },
    stock: 30,
  },
  {
    id: 2,
    name: "Zifriend ZA68 - Time Machine",
    price: 389000,
    description: "ZIFRIEND ZA68 RGB Hotswap Mechanical Keyboard",
    image:
      "https://lzd-img-global.slatic.net/g/p/3631c17829cf3ad43bc3bb852a85b062.jpg_720x720q80.jpg_.webp",
    is_active: true,
    category: {
      name: "Keyboard",
    },
    stock: 50,
  },
];

const container = {
  templateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  px: ["16px", "8px", "16px", "32px"],
  gap: "16px",
};

function ProductList() {
  const [products, setProducts] = useState([]);
  const search = useSelector((state) => state.search.products);
  const toast = useToast();

  async function fetchProducts() {
    const attributes = {
      search,
    };
    // console.log("search", attributes);
    const { data } = await getProducts(toast, attributes);
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, [search]);

  return (
    <Grid {...container}>
      {products.map((product, index) => (
        <ProductCard product={product} key={index} />
      ))}
    </Grid>
  );
}

export default ProductList;
