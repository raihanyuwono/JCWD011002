import {
  Flex,
  Grid,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import UserList from "./UsersList";
import { getUsers } from "../../../../api/admin";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddButton from "./AddButton";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const toast = useToast();
  const triggerUpdate = useSelector((state) => state.trigger.listUser);

  async function fetchUsers() {
    const { data } = await getUsers(toast);
    const { users: userList, pages } = data;
    setUsers(userList);
  }

  const userListAttr = {
    users,
  };

  useEffect(() => {
    fetchUsers();
  }, [triggerUpdate]);

  const mainContainer = {
    w: "full",
    direction: "column",
    pos: "relative",
  };

  const containerAttr = {
    w: "full",
    overflowX: "hidden",
  };

  const thAttr = {
    color: "textPrimary",
    textAlign: "center",
  };

  return (
    <Flex {...mainContainer}>
      <AddButton />
      <TableContainer {...containerAttr}>
        <Table>
          <Thead>
            <Tr>
              <Th {...thAttr}>No</Th>
              <Th {...thAttr}>Name</Th>
              <Th {...thAttr}>Role</Th>
              <Th {...thAttr}>Warehouse</Th>
              <Th {...thAttr}>Status</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            <UserList {...userListAttr} />
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}

export default ManageUsers;
