import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import axios from "axios";

const SelectShipping = () => {
  const [courierData, setCourierData] = useState([]);
  const warehouseAddress = {
    city_name: "Ngawi",
    postal_code: "63219",
    province_name: "Jawa Timur",
  };
  const [selectedCourier, setSelectedCourier] = useState("jne");
  const [warehouseCityId, setWarehouseCityId] = useState(null);
  const [destinationCityId, setDestinationCityId] = useState(null);

  const warehouseCityName = warehouseAddress.city_name;
  const destinationCityName = localStorage.getItem("city_name");
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://api.rajaongkir.com/starter/city",
        {
          headers: {
            key: "94bdba76d9396716fca4ab37cae797de",
          },
        }
      );

      if (response.data.rajaongkir.results) {
        const cities = response.data.rajaongkir.results;
        const warehouseCity = cities.find(
          (c) => c.city_name === warehouseCityName
        );
        const destinationCity = cities.find(
          (c) => c.city_name === destinationCityName
        );

        if (warehouseCity) {
          setWarehouseCityId(warehouseCity.city_id);
        } else {
          console.error("Warehouse city not found in the list");
        }
        if (destinationCity) {
          setDestinationCityId(destinationCity.city_id);
        } else {
          console.error("Destination city not found in the list");
        }
      } else {
        console.error("No results found in the city response");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [warehouseAddress.city_name]);

  useEffect(() => {
    if (warehouseCityId && destinationCityId) {
      const fetchCourierData = async () => {
        try {
          const courierResponse = await axios.post(
            "https://api.rajaongkir.com/starter/cost",
            {
              origin: warehouseCityId,
              destination: destinationCityId,
              weight: 1000,
              courier: selectedCourier,
            },
            {
              headers: {
                "Content-Type": "application/json",
                key: "94bdba76d9396716fca4ab37cae797de",
              },
            }
          );

          if (courierResponse.data.rajaongkir.results) {
            const data = courierResponse.data.rajaongkir.results[0].costs;
            setCourierData(data);
          } else {
            console.error("Error fetching courier data");
          }
        } catch (error) {
          console.error("Error fetching courier data:", error);
        }
      };

      fetchCourierData();
    }
  }, [selectedCourier, warehouseCityId, destinationCityId]);

  const handleMenuItemSelect = (courier) => {
    setSelectedCourier(courier);
  };

  return (
    <>
      <Box>
        <Text>
          warehouse address: {warehouseAddress.city_name},{" "}
          {warehouseAddress.province_name}, {warehouseAddress.postal_code}
        </Text>
      </Box>
      <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
          Select Shipping Methods
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => handleMenuItemSelect("jne")}>JNE</MenuItem>
          <MenuItem onClick={() => handleMenuItemSelect("pos")}>POS</MenuItem>
          <MenuItem onClick={() => handleMenuItemSelect("tiki")}>TIKI</MenuItem>
        </MenuList>
      </Menu>
      <Box mt={4}>
        <Text>Selected Courier: {selectedCourier.toUpperCase()}</Text>
      </Box>
      <Box mt={4}>
        <Text>Available Shipping Methods:</Text>
        <ul>
          {courierData.map((courier) => (
            <li key={courier.service}>
              {courier.service} - {courier.description}: {courier.cost[0].value}{" "}
              {courier.cost[0].etd}
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
};

export default SelectShipping;
