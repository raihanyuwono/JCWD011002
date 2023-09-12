import { Flex, Text } from "@chakra-ui/react";
import CardAdminMenu from "./CardAdminMenu";
import { getRole } from "../../helpers/Roles";

const containerAttr = {
  direction: "column",
  gap: "12px",
  w: "200px",
  m: "12px",
  px: "8px",
  pt: "16px",
  pb: "8px",
  bgColor: "bgSecondary",
  borderRadius: "8px",
  alignItems: "center",
};
const logoAttr = {
  variant: "title",
};
const menuAttr = {
  direction: "column",
  gap: "8px",
  w: "full",
};

function SideMenu({selected, setSelected, menuList}) {
  const role = getRole();
  return (
    <Flex {...containerAttr}>
      <Text {...logoAttr}>LOGO</Text>
      <Flex {...menuAttr}>
        {menuList
          .filter((menu) => menu["access"].includes(role))
          .map((menu, index) => (
            <CardAdminMenu
              {...menu}
              selected={index === selected ? true : false}
              setSelected={() => setSelected(index)}
              key={index}
            />
          ))}
      </Flex>
    </Flex>
  );
}

export default SideMenu;
