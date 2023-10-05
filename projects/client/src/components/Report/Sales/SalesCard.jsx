import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsCalendar3, BsFillCartCheckFill } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidCategoryAlt } from "react-icons/bi";
import { FaRankingStar } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import toRupiah from "@develoka/angka-rupiah-js";

function getMonthName(month) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return monthNames[month - 1] || "";
}

const SalesCard = () => {
  const API_URL = process.env.REACT_APP_API_BASE_URL;
  const [currentMonth, setCurrentMonth] = useState("");
  const [currentMonthSales, setCurrentMonthSales] = useState(null);
  const [bestSeller, setBestSeller] = useState([]);
  const [catBestSeller, setCatBestSeller] = useState([]);
  const [allTimeSales, setAllTimeSales] = useState([]);
  const [data, setData] = useState([]);

  const fetchSalesMonth = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/product/permonth`
      );
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonthNumber = currentDate.getMonth() + 1;
      const currentMonthName = getMonthName(currentMonthNumber);
      const currentMonthData = response.data.data.find(
        (item) => item.month === currentMonthNumber && item.year === currentYear
      );

      if (currentMonthData) {
        setCurrentMonth(currentMonthName);
        setCurrentMonthSales(currentMonthData.total_sales_monthly);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchBestSeller = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/product?orderBy=total_qty_sold desc`
      );
      setBestSeller(response.data.products[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const prod_best =
    bestSeller?.name?.length > 10
      ? bestSeller?.name?.slice(0, 10) + "..."
      : bestSeller?.name;

  const fetchCatBestSeller = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/report/sales/category?orderBy=total_qty_sold desc`
      );
      setCatBestSeller(response.data.categories[0]);
      console.log(response.data.categories[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const cat_best =
    catBestSeller?.category_name?.length > 10
      ? catBestSeller?.category_name?.slice(0, 10) + "..."
      : catBestSeller?.category_name;

  const fetchAllTimeSales = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/sales/monthly`);
      const allTimeTotalSales = response.data.data.reduce(
        (total, monthData) =>
          total + parseInt(monthData.total_sales_per_month, 10),
        0
      );

      setAllTimeSales(allTimeTotalSales);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/report/summary`);
      setData(response.data.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSalesMonth();
    fetchBestSeller();
    fetchCatBestSeller();
    fetchAllTimeSales();
    fetchData();
  }, []);

  const size = {
    size: "22px",
    color: "#F09B0A",
  };

  const stats = [
    {
      id: 1,
      label: "All Time Sales",
      value:
        allTimeSales !== null
          ? toRupiah(allTimeSales, { dot: ".", floatingPoint: 0 })
          : "Loading...",
      icon: <FcSalesPerformance {...size} />,
    },
    {
      id: 2,
      label: `${currentMonth} Sales`,
      value:
        currentMonthSales !== null
          ? toRupiah(currentMonthSales, { dot: ".", floatingPoint: 0 })
          : "Loading...",
      icon: <BsCalendar3 {...size} />,
    },
    {
      id: 3,
      label: "Best Seller",
      value: (
        <Tooltip
          label={bestSeller.name}
          bg={"white"}
          color={"black"}
          aria-label="A tooltip"
        >
          <Text>{prod_best}</Text>
        </Tooltip>
      ),
      icon: <FaRankingStar {...size} />,
    },
    {
      id: 4,
      label: "Best Category",
      value: cat_best,
      icon: <BiSolidCategoryAlt {...size} />,
    },
    {
      id: 5,
      label: "Order Success",
      value: `${data.order_success} Orders`,
      icon: <BsFillCartCheckFill {...size} />,
    },
    {
      id: 6,
      label: "Popular Courier",
      value: `${data.popular_shipping}`,
      icon: <TbTruckDelivery {...size} />,
    },
  ];

  return (
    <Flex gap={2} mr={2}>
      {stats.map((item) => (
        <Flex
          key={item.id}
          w={"13vw"}
          p={"15px"}
          bg="bgSecondary"
          borderRadius="lg"
          boxShadow="sm"
          justifyContent={"space-between"}
        >
          <Box
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            bg={"#34638A"}
            h={"50px"}
            w={"50px"}
            borderRadius={"full"}
          >
            {item.icon}
          </Box>
          <Flex color={"white"} direction={"column"}>
            <Text
              fontWeight={"light"}
              mt={0.5}
              align={"right"}
              alignContent={"center"}
              fontSize="sm"
            >
              {item.label}
            </Text>
            <Text fontSize={"md"} align={"right"} fontWeight={"bold"}>
              {item.value}
            </Text>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default SalesCard;
