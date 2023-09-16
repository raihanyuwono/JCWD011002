import {
  Grid,
  Table,
  TableContainer,
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
    setUsers(data);
  }

  const userListAttr = {
    users,
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <TableContainer>
      <Table >
        <Thead >
          <Tr>
            <Th>No</Th>
            <Th>Name</Th>
            <Th>Warehouse</Th>
            <Th>Email</Th>
            <Th>Phone</Th>
            <Th>Role</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        {/* <UserList /> */}
      </Table>
    </TableContainer>
    // <Grid {...mainContainer}>
    //   <AddButton />
    //   <UserList {...userListAttr} />
    // </Grid>
  );
}

export default ManageUsers;
