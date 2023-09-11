import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import jwt_decode from "jwt-decode";
import AdminDashboard from "./pages/AdminDashboard";

const mainContainerAttr = {
  w: "100vw",
  h: "100vh",
  color: "textPrimary",
  direction: "column",
};

function getRole() {
  const token = localStorage.getItem("token");
  if (!token) return;
  return jwt_decode(token)["role"];
}

function setPage() {
  if (getRole() === "admin") return <AdminDashboard />;
  return <HomePage />;
}

function App() {
  return (
    <Flex {...mainContainerAttr}>
      <NavUser />
      <Routes>
        <Route path="/" element={setPage()} />
        <Route path="/registration/:token" element={<Registration />} />
        <Route path="/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
      <Footer />
    </Flex>
  );
}

export default App;
