import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import DrawerAddForm from "./DrawerAddForm";
import { useFormik } from "formik";
import DrawerAddButton from "./DrawerAddButton";

const drawerContentAttr = {
  bgColor: "secondary",
  color: "textPrimary",
};
const drawerHeaderAttr = {
  borderBottomWidth: "1px",
};
const drawerBodyAttr = {
  py: "20px",
};
const drawerFooterAttr = {
  borderTopWidth: "1px",
};
const initialValues = {
  role: 0,
  warehouse: 0,
};

function DrawerAddAdmin({ isOpen, onClose }) {
  const drawerAttr = {
    isOpen,
    onClose,
    placement: "right",
  };

  async function handleSubmit(attributes) {
    // Send Data
    console.log("NEW ADMIN", attributes)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => handleSubmit(values),
  });

  const addFormAttr = {
    formik,
  };

  return (
    <Drawer {...drawerAttr}>
      <DrawerOverlay />
      <DrawerContent {...drawerContentAttr}>
        <DrawerHeader {...drawerHeaderAttr}>Add Admin</DrawerHeader>
        <DrawerCloseButton />
        <DrawerBody {...drawerBodyAttr}>
          <DrawerAddForm {...addFormAttr} />
        </DrawerBody>
        <DrawerFooter {...drawerFooterAttr}>
          <DrawerAddButton />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

export default DrawerAddAdmin;
