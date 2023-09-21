import React from "react";
import { Box, Button, HStack, Icon } from "@chakra-ui/react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({
  totalItems,
  itemsPerPage,
  onPageChange,
  currentPage,
  totalPages, // New prop to determine the total number of pages
}) => {
  // Calculate the total number of pages based on total items and items per page
  const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);

  // Determine the total pages to be used in the pagination
  const pagesToDisplay = totalPages || calculatedTotalPages;

  const handlePageClick = (page) => {
    onPageChange(page);
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

  return (
    <Box mt={4} color={"white"}>
      <HStack spacing={2}>
        {currentPage > 1 && (
          <Button onClick={handlePreviousClick} variant="solid">
            <Icon as={IoIosArrowBack} />
          </Button>
        )}
        {Array.from({ length: pagesToDisplay }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <Button
              color={currentPage === pageNumber ? "black" : "white"}
              _hover={{ color: "black", bgColor: "white" }}
              key={pageNumber}
              onClick={() => handlePageClick(pageNumber)}
              variant={currentPage === pageNumber ? "solid" : "outline"}
            >
              {pageNumber}
            </Button>
          );
        })}
        {currentPage < pagesToDisplay && (
          <Button onClick={handleNextClick} variant="solid">
            <Icon as={IoIosArrowForward} />
          </Button>
        )}
      </HStack>
    </Box>
  );
};

export default Pagination;
