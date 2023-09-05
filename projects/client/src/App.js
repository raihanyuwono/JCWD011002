import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import CartPage from "./pages/CartPage";
const mainContainerAttr = {
  w: "100vw",
  h: "100vh",
  color: "textPrimary",
  direction: "column",
};

function App() {
  return (
    <Flex {...mainContainerAttr}>
      <NavUser />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/registration/:token" element={<Registration />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Flex>
  );
}

export default App;
