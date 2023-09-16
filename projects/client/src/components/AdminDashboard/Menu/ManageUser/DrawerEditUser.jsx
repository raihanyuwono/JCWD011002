import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import EditableCustom from "../../../Custom/EditableCustom";
import { FiTrash2 as IcDelete, FiEdit as IcEdit } from "react-icons/fi";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
};

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerEditUser({ user, isOpen, onClose }) {
  const drawerAttr = {
    isOpen,
    onClose,
    placement: "right",
  };
  const editButtonAttr = {
    variant: "edit",
    leftIcon: <IcEdit />,
  };
  const deleteButtonAttr = {
    variant: "error",
    leftIcon: <IcDelete />,
  };

  const {
    isOpen: confirmOpen,
    onClose: confirmColse,
    onToggle: confirmToggle,
  } = useDisclosure();

  function deletePopover() {
    confirmToggle();
  }

  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>{user["name"]}</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody>
          {user.email}
          <EditableCustom />
        </DrawerBody>
        <DrawerFooter {...drawerFooterAttr}>
          <Flex {...buttonContainer}>
            <Button {...editButtonAttr}>Edit</Button>
            <Button {...deleteButtonAttr}>Delete</Button>
          </Flex>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default DrawerEditUser;
