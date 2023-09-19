import { Flex, Image } from "@chakra-ui/react";
import DrawerInfoDetail, { setInfoDetail } from "./DrawerInfoDetail";
import getImage from "../../../../api/GetImage";

function capitalize(x) {
  x = x.split(" ");
  x = x.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
  return x;
}

function DrawerInfo({ data }) {
  const { user, warehouse } = data;
  const container = {
    direction: "column",
    gap: "12px",
  };

  const avatarAttr = {
    src: getImage(user?.avatar),
    borderRadius: "8px",
  }
  const nameAttr = setInfoDetail("Name", user?.name);
  const usernameAttr = setInfoDetail("Username", user?.username);
  const emailAttr = setInfoDetail("Email", user?.email);
  const phoneAttr = setInfoDetail("Phone", user?.phone);
  const roleAttr = setInfoDetail("Role", capitalize(user?.role?.name));
  const warehouseAttr = setInfoDetail("Warehouse", warehouse?.name);

  return (
    <Flex {...container}>
      <Image {...avatarAttr}/>
      <DrawerInfoDetail {...nameAttr} />
      <DrawerInfoDetail {...usernameAttr} />
      <DrawerInfoDetail {...emailAttr} />
      <DrawerInfoDetail {...phoneAttr} />
      <DrawerInfoDetail {...roleAttr} />
      {user?.role?.name !== "admin" && <DrawerInfoDetail {...warehouseAttr} />}
    </Flex>
  );
}

export default DrawerInfo;
