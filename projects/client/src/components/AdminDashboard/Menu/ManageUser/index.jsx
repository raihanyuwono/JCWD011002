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

const mainContainer = {
  w: "full",
  gap: "12px",
  templateColumns: {
    sm: "repeat(2, 1fr)",
    md: "repeat(3, 1fr)",
    lg: "repeat(5, 1fr)",
    xl: "repeat(6, 1fr)",
  },
};

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
            <Th {...thAttr}>Email</Th>
            <Th {...thAttr}>Phone</Th>
            <Th {...thAttr}>Status</Th>
            <Th></Th>
          </Tr>
        </Thead>
        <Tbody>
          <UserList {...userListAttr} />
        </Tbody>
      </Table>
    </TableContainer>
    // <Grid {...mainContainer}>
    //   <AddButton />
    //   <UserList {...userListAttr} />
    // </Grid>
  );
}

export default ManageUsers;
