import { Button, Flex, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const mainContainer = {
  w: "full",
  justifyContent: "center",
  pos: "absolute",
  bottom: 0,
};

const container = {
  direction: "row",
  gap: 2,
};

function Pagination({ maxPage, currentPage, setCurrentPage }) {
  function handlePageClick(page) {
    setCurrentPage(page);
  }

  function handlePrevClick() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleNextClick() {
    if (currentPage < maxPage) setCurrentPage(currentPage + 1);
  }

  function setButtonNum(page) {
    return {
      children: page,
      onClick: () => handlePageClick(page),
      color: page === currentPage ? "black" : "white",
      variant: page === currentPage ? "solid" : "outline",
      _hover: {
        color: "black",
        bgColor: "white",
      },
    };
  }

  const buttonPrev = {
    children: <Icon as={IoIosArrowBack} />,
    onClick: handlePrevClick,
    variant: "solid",
    isDisabled: currentPage <= 1 ? true : false,
  };

  const buttonNext = {
    children: <Icon as={IoIosArrowForward} />,
    onClick: handleNextClick,
    variant: "solid",
    isDisabled: currentPage >= maxPage ? true : false,
  };

  return (
    <Flex {...mainContainer}>
      <Flex {...container}>
        <Button {...buttonPrev} />
        {Array.from({ length: maxPage }, (_, index) => (
          <Button {...setButtonNum(index + 1)} key={index + 1} />
        ))}
        <Button {...buttonNext} />
      </Flex>
    </Flex>
  );
}

export default Pagination;
