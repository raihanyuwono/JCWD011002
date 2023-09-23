import { FiEdit as IcEdit } from "react-icons/fi";
import { Button, Flex, useToast } from "@chakra-ui/react";
import { updateAdmin } from "../../../../api/admin";
import { useDispatch } from "react-redux";
import { setUserTrigger } from "../../../../storage/TriggerReducer";
import PopoverConfirmation from "./PopoverConfirmation";

const buttonContainer = {
  direction: "column",
  w: "full",
  gap: "8px",
};

function DrawerBaseButtonGroup({ editToggle, user, onClose }) {
  const toast = useToast();
  const dispatch = useDispatch();
  const { id, is_active } = user;

  async function handleActivation() {
    await updateAdmin(toast, id, { is_active: !is_active });
    onClose();
    dispatch(setUserTrigger());
  }

  const editButtonAttr = {
    variant: "edit",
    leftIcon: <IcEdit />,
    onClick: () => editToggle(true),
  };
  const activationButtonAttr = {
    variant: is_active ? "error" : "success",
    onClick: () => handleActivation(),
    children: is_active ? "Deactivate" : "Activate",
  };

  const confirmation = {
    trigger: <Button>LOL</Button>,
    confirm: () => console.log("CONFIRM"),
  };
  return (
    <Flex {...buttonContainer}>
      <Button {...editButtonAttr}>Edit</Button>
      <PopoverConfirmation {...confirmation} />
      <Button {...activationButtonAttr} />
    </Flex>
  );
}

export default DrawerBaseButtonGroup;
