import { Route, Routes } from "react-router-dom";
import { Flex, useToast } from "@chakra-ui/react";
import Registration from "./pages/Registration";
import HomePage from "./pages/HomePage";
import NavUser from "./components/Navbar/NavUser";
import Profile from "./pages/Profile";
import Footer from "./components/Footer/Footer";
import ResetPassword from "./pages/ResetPassword";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import UserAddress from "./pages/UserAddress";
import AdminDashboard from "./pages/AdminDashboard";
import { getRole } from "./helpers/Roles";
import { useEffect, useState } from "react";
import UserProfile from "./components/Profile/UpdateProfile";
import { getUser } from "./api/profile";
import Transaction from "./components/Profile/Transaction";
import ProductCategory from "./components/AdminDashboard/Menu/ProductCategory/ProductCategory";
import ProductList from "./components/AdminDashboard/Menu/Product/ProductList";

const ADMIN_PATH = ["/", "/profile"];

const mainContainerAttr = {
  w: "100vw",
  pt: "64px",
  color: "textPrimary",
  direction: "column",
};

const contentContainerAttr = {
  w: "100vw",
  minH: "calc(100vh - 64px - 187px)",
};

function setPage() {
  if (getRole() === "admin") return <AdminDashboard />;
  return <HomePage />;
}

function adminPath() {
  const role = getRole();
  const currentPath = document.location.pathname;
  if (role === "admin" && !ADMIN_PATH.includes(currentPath))
    document.location.href = "/";
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    adminPath();
    setTimeout(() => {
      setIsLoading(false);
    }, 10);
  }, []);

  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    phone: '',
    is_verified: false,
    role: '',
    current_password: '',
    new_password: '',
    confirm_password: '',
    avatar: '',
  });
  const toast = useToast()
  const token = localStorage.getItem('token')
  const fetchUserData = async () => {
    await getUser(token, setUserData, toast);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!isLoading)
    return (
      <Flex {...mainContainerAttr}>
        <NavUser />
        <Flex {...contentContainerAttr}>
          <Routes>
            <Route path="/" element={setPage()}>
              {/* <Route path="user" element={} /> */}
              {/* <Route path="warehouse" element={} /> */}
              <Route path="category" element={<ProductCategory />} />
              <Route path="product" element={<ProductList />} />
              {/* <Route path="stockmutation" element={} /> */}
              {/* <Route path="order" element={} /> */}
              {/* <Route path="report" element={} /> */}
            </Route>
            <Route path="/registration/:token" element={<Registration />} />
            <Route path="/profile" element={<Profile userData={userData} />}>
              <Route path="" element={<UserProfile userData={userData} setUserData={setUserData} />} />
              <Route path="address" element={<UserAddress />} />
              <Route path="transaction" element={<Transaction />} />
            </Route>
            <Route path="/reset/:token" element={<ResetPassword />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/category" element={<ProductCategory />} />
          </Routes>
        </Flex>
        <Footer />
      </Flex>
    );
}

export default App;
