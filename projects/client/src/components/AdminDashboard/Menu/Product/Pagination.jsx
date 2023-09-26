import React from 'react';
import { Button, Flex, } from '@chakra-ui/react';
import { BiRightArrow, BiLeftArrow } from 'react-icons/bi';
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const showPages = 5;
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= showPages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 2) {
      for (let i = 1; i <= showPages; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - showPages + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    return pages;
  };
  const pagesToShow = getPageNumbers();

  return (
    <Flex justify="center" mt="4">
      {currentPage > 1 ? (
        <Button
          mr={1}
          onClick={() => handlePageChange(currentPage - 1)}
          bg={"darkBlue"}
          color={"white"}
          variant={'outline'}
          disabled={currentPage === 1}
        >
          <BiLeftArrow />
        </Button>
      ) : (<Button mr={1} colorScheme='blue' variant={'outline'} disabled><BiLeftArrow /></Button>)}
      {pagesToShow.map((page) => (
        <Button
          key={page}
          mx={1}
          onClick={() => handlePageChange(page)}
          variant={'solid'}
          border={'1px'}
          color={"white"}
          borderColor={'white'}
          bg={currentPage === page ? 'darkBlue' : 'gray.300'}
          style={{ borderRadius: '5px' }}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages ? (
        <Button
          ml={1}
          bg={'darkBlue'}
          color={"white"}
          colorScheme='teal' variant={'outline'}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <BiRightArrow />
        </Button>
      ) : (
        <Button ml={1} colorScheme='blue' variant={'outline'} disabled><BiRightArrow /></Button>
      )}
    </Flex>
  );
};


export default Pagination;
