import CardUser from "./CardUser";
import DataUser from "./DataUser";

function UserList({ users }) {
  console.log("SINI", users)
  // return users.map((user, index) => <CardUser user={user} key={index} />);
  return users.map((user, index) => (
    <DataUser admin={user} num={index + 1} key={index} />
  ));
}

export default UserList;
