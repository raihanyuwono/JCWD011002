import {
  Button,
  Flex,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react";
import { TbShoppingCartPlus as IcAddToCart } from "react-icons/tb";
import GetImage from "../../api/GetImage";
import { formaterPrice } from "../../helpers/formater";

const container = {
  direction: "column",
  w: "full",
  bgColor: "white",
  color: "textReversePrimary",
  pos: "relative",
};

const detailAttr = {
  direction: "column",
  p: "8px",
};

const addCartPos = {
  base: "4px",
  sm: "0px",
  md: "4px",
  lg: "8px",
};

const nameAttr = {
  fontWeight: "semibold",
  noOfLines: 1,
  fontSize: "lg",
  //   fontFamily: "Fira Sans",
};

const categoryAttr = {
  borderRadius: "8px",
  noOfLines: 1,
  bgColor: "bgSecondary",
  opacity: "0.8",
  w: "fit-content",
  p: "4px 8px",
  fontSize: "sm",
  fontWeight: "semibold",
  color: "textPrimary",
  border: "1px solid",
  borderColor: "textSecondary",
  pos: "absolute",
  right: "8px",
  bottom: "8px",
};

const priceAttr = {
  fontFamily: "Fira Sans",
};

function ProductCard({ product }) {
  const mainContainer = {
    w: "full",
    onClick: () => console.log(product?.id),
    cursor: "pointer",
    transitionDuration: ".3s",
    borderRadius: "8px",
    overflow: "hidden",
    _hover: {
      transform: "translateY(-12px)",
    },
  };

  const imageAttr = {
    src: GetImage(product?.image),
    objectFit: "cover",
  };

  const addCartAttr = {
    children: <IcAddToCart />,
    p: "4px",
    pos: "absolute",
    top: addCartPos,
    right: addCartPos,
    borderRadius: "8px",
    bgColor: "#FFFFFF66",
    color: "textReverseSecondary",
    fontSize: ["28px", "28px", "24px", "28px", "36px"],
    transition: ".4s",
    _hover: {
      color: "textPrimary",
      bgColor: "#00000066",
    },
  };

  const imageSectionAttr = {
    pos: "relative",
  };

  const addToCartAttr = {
    children: "Add to cart",
    fontFamily: "Fira Code",
    variant: "edit",
    mt: "8px",
  };

  return (
    <GridItem {...mainContainer}>
      <Flex {...container}>
        <Flex {...imageSectionAttr}>
          <Image {...imageAttr} />
          <Text {...categoryAttr}>{product?.category}</Text>
        </Flex>
        <Flex {...detailAttr}>
          <Text {...nameAttr}>{product?.name}</Text>
          <Text {...priceAttr}>Rp {formaterPrice(product?.price)}</Text>
          <Button {...addToCartAttr} />
        </Flex>
      </Flex>
    </GridItem>
  );
}

export default ProductCard;
