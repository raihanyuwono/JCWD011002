import React, { useState } from "react";
import {
  Box,
  Button,
  HStack,
  Icon,
  Input,
  useToast,
  useMediaQuery,
  extendTheme,
} from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
  totalPages,
}) => {
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesToDisplay = totalPages || calculatedTotalPages;

  const [inputPage, setInputPage] = useState(currentPage);
  const toast = useToast();

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const handleFirstPageClick = () => {
    onPageChange(1);
  };

  const handleLastPageClick = () => {
    onPageChange(pagesToDisplay);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pagesToDisplay) {
      onPageChange(currentPage + 1);
    }
  };

  const handleInputPageChange = (event) => {
    setInputPage(event.target.value);
  };

  const handleGoToPage = () => {
    const page = parseInt(inputPage);
    if (page >= 1 && page <= pagesToDisplay) {
      onPageChange(page);
    } else {
      toast({
        title: "Invalid Page",
        description: `Please enter a page number between 1 and ${pagesToDisplay}.`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const breakpoints = {
    sm: "320px",
    md: "768px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  };

  const theme = extendTheme({ breakpoints });
  const [isMd] = useMediaQuery("(max-width: " + theme.breakpoints.md + ")");

  return (
    <Box px={isMd ? 2 : 0} mt={2} color={"white"}>
      <HStack spacing={2}>
        <Button
          onClick={handleFirstPageClick}
          size={isMd ? "sm" : "sm"}
          variant="solid"
          isDisabled={currentPage === 1}
        >
          First
        </Button>
        <Button
          onClick={handlePreviousClick}
          variant={"solid"}
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === 1}
        >
          <Icon as={IoIosArrowBack} />
        </Button>
        <Button
          key={currentPage}
          onClick={() => handlePageClick(currentPage)}
          variant="solid"
          size={isMd ? "sm" : "sm"}
        >
          {currentPage}
        </Button>
        <Button
          onClick={handleNextClick}
          variant="solid"
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === pagesToDisplay}
        >
          <Icon as={IoIosArrowForward} />
        </Button>
        <Button
          onClick={handleLastPageClick}
          variant="solid"
          size={isMd ? "sm" : "sm"}
          isDisabled={currentPage === pagesToDisplay}
        >
          Last
        </Button>
        <Input
          textAlign={"center"}
          type="number"
          variant="outline"
          color="white"
          size={isMd ? "sm" : "sm"}
          borderRadius={"none"}
          _hover={{ color: "black", bgColor: "white" }}
          w={"55px"}
          placeholder="Go"
          value={inputPage}
          onChange={handleInputPageChange}
        />
        <Button
          size={isMd ? "sm" : "sm"}
          onClick={handleGoToPage}
          variant="solid"
        >
          Go
        </Button>
      </HStack>
    </Box>
  );
};

export default Pagination;
