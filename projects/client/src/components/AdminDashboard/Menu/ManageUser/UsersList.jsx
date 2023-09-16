import CardUser from "./CardUser";

function UserList({ users }) {
  return users.map((user, index) => <CardUser user={user} key={index} />);
}

export default UserList;
