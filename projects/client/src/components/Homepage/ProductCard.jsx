import { Box, Flex, GridItem, Icon, Image, Text } from "@chakra-ui/react";
import { TbShoppingCartPlus as IcAddToCart } from "react-icons/tb";
import GetImage from "../../api/GetImage";
import { formaterPrice } from "../../helpers/formater";

const container = {
  direction: "column",
  overflow: "hidden",
  borderRadius: "8px",
  w: "full",
  bgColor: "white",
  color: "textReversePrimary",
  pos: "relative",
};

const detailAttr = {
  direction: "column",
  p: "8px",
  gap: "4px",
};

const addCartPos = {
  sm: "0px",
  md: "4px",
  lg: "8px",
};

const nameAttr = {
  fontWeight: "semibold",
  noOfLines: 2,
  fontSize: "lg",
  //   fontFamily: "Fira Sans",
};

const categoryAttr = {
  borderRadius: "4px",
  noOfLines: 1,
  bgColor: "bgSecondary",
  w: "fit-content",
  p: "4px 8px",
  fontSize: "sm",
  color: "textPrimary",
};

const priceAttr = {
  fontWeight: "semibold",
};

function ProductCard({ product }) {
  const mainContainer = {
    w: "full",
    onClick: () => console.log(product?.id),
    cursor: "pointer",
    transitionDuration: ".3s",
    _hover: {
      transform: "translateY(-12px)",
    },
  };

  const imageAttr = {
    // src: GetImage(product?.image),
    src: product?.image,
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
    fontSize: {
      sm: "20px",
      md: "24px",
      lg: "36px",
    },
    transition: ".4s",
    _hover: {
      color: "textPrimary",
      bgColor: "#00000066",
    },
  };

  return (
    <GridItem {...mainContainer}>
      <Flex {...container}>
        <Box {...addCartAttr} />
        <Image {...imageAttr} />
        <Flex {...detailAttr}>
          <Text {...nameAttr}>{product?.name}</Text>
          <Text {...categoryAttr}>{product?.category?.name}</Text>
          <Text {...priceAttr}>Rp {formaterPrice(product?.price)}</Text>
        </Flex>
      </Flex>
    </GridItem>
  );
}

export default ProductCard;
