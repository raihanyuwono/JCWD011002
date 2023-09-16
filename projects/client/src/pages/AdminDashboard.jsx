import { Flex, Text } from "@chakra-ui/react";
import SideMenu from "../components/AdminDashboard/SideMenu";
import { useState } from "react";
import {
  BiHomeAlt2 as IcHome,
  BiUser as IcUser,
  BiGitPullRequest as IcMutation,
  BiCartAlt as IcOrder,
} from "react-icons/bi";
import {
  PiWarehouse as IcWarehouse,
  PiBagSimple as IcProduct,
} from "react-icons/pi";
import { TbCategory as IcCategory } from "react-icons/tb";
import { SlGraph as IcReport } from "react-icons/sl";
import { Link, Outlet } from "react-router-dom";

const ACCESS_ADMIN = ["admin"];
const ACCESS_ALL_ADMIN = ["admin", "admin warehouse"];

const container = {
  bgColor: "bgPrimary",
};

function createMenuSet(name, logo, access, page) {
  return { name, logo, access, page };
}

function dummyPage(name) {
  return <Text>{name}</Text>
}

const menuList = [
  createMenuSet("Dashboard", <IcHome />, ACCESS_ALL_ADMIN, dummyPage("Dashboard")),
  createMenuSet("Users", <IcUser />, ACCESS_ADMIN, dummyPage("Manage Users")),
  createMenuSet("Warehouses", <IcWarehouse />, ACCESS_ADMIN, dummyPage("Manage Warehouses")),
  createMenuSet("Categories", <IcCategory />, ACCESS_ADMIN, dummyPage("Manage Categories")),
  createMenuSet("Products", <IcProduct />, ACCESS_ADMIN, dummyPage("Manage Products")),
  createMenuSet("Mutations", <IcMutation />, ACCESS_ALL_ADMIN, dummyPage("Manage Mutation")),
  createMenuSet("Orders", <IcOrder />, ACCESS_ADMIN, dummyPage("Manage Order")),
  createMenuSet("Reports", <IcReport />, ACCESS_ALL_ADMIN, dummyPage("Reports")),
];

function AdminDashboard() {
  const [selected, setSelected] = useState(0);
  const sideMenuAttr = {
    selected,
    setSelected,
    menuList,
  };
  return (
    <Flex {...container}>
      <SideMenu {...sideMenuAttr} />
      {menuList[selected]["page"]}
      <Link to="/test">Profile</Link>
      <Link to="/testing">Transaction</Link>
      <Outlet />
    </Flex>
  );
}

/*
MENU
  - Dashboard
  - Manage User
  - Manage Warehouse
  - Manage Category
  - Manage Product
  - Manage Mutation
  - Manage Order
    - approve and make request
  - Report
*/

export default AdminDashboard;
