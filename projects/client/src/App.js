import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import TransactionList from "./components/Transaction/TransactionList";

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
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/transaction" element={<TransactionList />} />
      </Routes>
      <Footer />
    </Flex>
  );
}

export default App;
