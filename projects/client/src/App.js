import { Route, Routes } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import { getRole } from "./helpers/Roles";
import { useEffect, useState } from "react";

const mainContainerAttr = {
  w: "100vw",
  h: "100vh",
  color: "textPrimary",
  direction: "column",
};

function setPage() {
  if (getRole() === "admin") return <AdminDashboard />;
  return <HomePage />;
}

function adminPath() {
  const role = getRole();
  const currentPath = document.location.pathname;
  console.log(currentPath);
  if (role === "admin" && currentPath !== "/") document.location.href = "/";
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    adminPath();
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  if (!isLoading)
    return (
      <Flex {...mainContainerAttr}>
        <NavUser />
        <Routes>
          <Route path="/" element={setPage()} />
          <Route path="/registration/:token" element={<Registration />} />
          <Route path="/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </Flex>
    );
}

export default App;
