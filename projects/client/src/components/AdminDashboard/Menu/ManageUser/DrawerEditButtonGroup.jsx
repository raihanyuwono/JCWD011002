import { FiSave as IcSave } from "react-icons/fi";
import { GiCancel as IcCancel } from "react-icons/gi";
import { Button, Flex } from "@chakra-ui/react";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerEditButtonGroup({ editToggle }) {
  const saveButtonAttr = {
    variant: "success",
    leftIcon: <IcSave />,
    onClick: () => document.getElementById("save-button").click(),
  };
  const cancelButtonAttr = {
    variant: "error",
    leftIcon: <IcCancel />,
    onClick: () => editToggle(false),
  };
  return (
    <Flex {...buttonContainer}>
      <Button {...saveButtonAttr}>Save</Button>
      <Button {...cancelButtonAttr}>Cancel</Button>
    </Flex>
  );
}

export default DrawerEditButtonGroup;
