import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Badge,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import React from "react";
import jwt_decode from "jwt-decode";
function CancelOrder({ transactionId }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const userId = jwt_decode(localStorage.getItem("token")).id;

  return (
    <>
      <Badge mt={"0.5"} onClick={onOpen} alignSelf={"center"} colorScheme="red">
        Cancel
      </Badge>
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Cancel Order?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Are you sure you want to cancel this order? {transactionId} {userId}
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              No
            </Button>
            <Button
              colorScheme="red"
              ml={3}
              onClick={() => {
                // fetchData();
                console.log("Cancel");
              }}
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CancelOrder;
