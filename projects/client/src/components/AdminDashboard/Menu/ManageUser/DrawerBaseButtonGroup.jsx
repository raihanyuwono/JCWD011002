import { FiTrash2 as IcDelete, FiEdit as IcEdit } from "react-icons/fi";
import { Button, Flex } from "@chakra-ui/react";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerBaseButtonGroup({ editToggle }) {
  const editButtonAttr = {
    variant: "edit",
    leftIcon: <IcEdit />,
    onClick: () => editToggle(true),
  };
  const deleteButtonAttr = {
    variant: "error",
    leftIcon: <IcDelete />,
  };
  return (
    <Flex {...buttonContainer}>
      <Button {...editButtonAttr}>Edit</Button>
      <Button {...deleteButtonAttr}>Delete</Button>
    </Flex>
  );
}

export default DrawerBaseButtonGroup;
