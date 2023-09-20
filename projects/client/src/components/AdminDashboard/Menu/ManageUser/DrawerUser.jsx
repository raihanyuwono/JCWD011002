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
import { FiTrash2 as IcDelete, FiEdit as IcEdit } from "react-icons/fi";
import DrawerInfo from "./DrawerInfo";
import DrawerEdit from "./DrawerEdit";
import { useState } from "react";
import DrawerBaseButtonGroup from "./DrawerBaseButtonGroup";
import DrawerEditButtonGroup from "./DrawerEditButtonGroup";

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

function DrawerUser({ admin, isOpen, onClose }) {
  const [isEdit, setIsEdit] = useState(false);
  const { user } = admin;

  const drawerAttr = {
    isOpen,
    onClose: () => {
      onClose();
      setIsEdit(false);
    },
    placement: "right",
  };

  const {
    isOpen: confirmOpen,
    onClose: confirmColse,
    onToggle: confirmToggle,
  } = useDisclosure();

  function deletePopover() {
    confirmToggle();
  }

  function setDrawerContent() {
    return isEdit ? <DrawerEdit data={admin} /> : <DrawerInfo data={admin} />;
  }

  function setDrawerButton() {
    return isEdit ? (
      <DrawerEditButtonGroup editToggle={setIsEdit} />
    ) : (
      <DrawerBaseButtonGroup editToggle={setIsEdit} />
    );
  }

  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>
          {isEdit ? user?.username : "Information"}
        </DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody py="20px">{setDrawerContent()}</DrawerBody>
        <DrawerFooter {...drawerFooterAttr}>{setDrawerButton()}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
export default DrawerUser;
