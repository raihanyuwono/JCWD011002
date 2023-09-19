import {
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
import AddButton from "../AddButton";

function ManageUsers() {
  const [users, setUsers] = useState([]);
  const toast = useToast();

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
  }, []);

  const containerAttr = {
    w: "full",
    overflowX: "hidden",
  };

  const thAttr = {
    color: "textPrimary",
    textAlign: "center",
  };

  return (
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
  );
}

export default ManageUsers;
