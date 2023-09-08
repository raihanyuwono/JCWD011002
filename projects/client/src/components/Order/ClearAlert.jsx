import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
const ClearAlert = ({ coba, userId }) => {
  const toast = useToast();
  const clearCart = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/order/${userId}`
      );
      coba();
      toast({
        title: "Cart Cleared!",
        status: "success",
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };
  return (
    <>
      <Popover isLazy>
        <PopoverTrigger>
          <Button borderRadius={"none"} variant={"error"}>
            Clear
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader
            bg={"textSecondary"}
            color={"primary"}
            fontWeight="semibold"
          >
            Clear Cart
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody bgColor={"textSecondary"} color={"primary"}>
            <Text>Are you sure want to clear your cart?</Text>
            <Button mt={2} mb={1} variant={"error"} onClick={clearCart}>
              Clear
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ClearAlert;
