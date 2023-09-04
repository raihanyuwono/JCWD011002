import Login from "./components/Login";
import SelectAddress from "./components/order/SelectAddress";
import SelectShipping from "./components/order/SelectShipping";

function App() {
  return (
    <>
      <Login />
      <SelectAddress />
      <br />
      <SelectShipping />
    </>
  );
}

export default App;
