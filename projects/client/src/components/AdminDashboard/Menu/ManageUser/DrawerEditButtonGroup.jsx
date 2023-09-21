import { FiSave as IcSave} from "react-icons/fi";
import { GiCancel as IcCancel } from "react-icons/gi";
import { Button, Flex } from "@chakra-ui/react";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerEditButtonGroup({editToggle}) {
  const saveButtonAttr = {
    type: "submit",
    variant: "success",
    leftIcon: <IcSave />,
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
