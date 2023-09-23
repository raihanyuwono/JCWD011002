import { Button, Flex } from "@chakra-ui/react";

const container = {
  w: "full",
};

const addButtonAttr = {
  children: "Create New Admin",
  variant: "success",
  w: "full",
  onClick: () => document.getElementById("add-admin-button").click(),
};

function DrawerAddButton() {
  return (
    <Flex {...container}>
      <Button {...addButtonAttr} />
    </Flex>
  );
}

export default DrawerAddButton;
