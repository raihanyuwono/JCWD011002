import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import axios from "axios";

const SelectShipping = () => {
  const warehouseAddress = {
    city_name: "Ngawi",
    postal_code: "63219",
    province_name: "Jawa Timur",
  };
  const [courierData, setCourierData] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [warehouseCityId, setWarehouseCityId] = useState(null);
  const [destinationCityId, setDestinationCityId] = useState(null);
  const warehouseCityName = warehouseAddress.city_name;
  const destinationCityName = localStorage.getItem("city_name");

  useEffect(() => {
    if (
      selectedService &&
      selectedService.cost &&
      selectedService.cost.length > 0
    ) {
      localStorage.setItem("shipping", selectedService.cost[0].value);
    } else {
      console.log("Shipping information is not available.");
    }
  }, [selectedService]);

  const fetchShippingMethods = async (courier) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/rajaongkir/cost",
        {
          origin: warehouseCityId,
          destination: destinationCityId,
          weight: 1000,
          courier: courier,
        }
      );
      if (response.data.rajaongkir.results) {
        return response.data.rajaongkir.results[0].costs.map((cost) => ({
          ...cost,
          code: courier,
        }));
      }
    } catch (error) {
      console.error(`Error fetching ${courier} courier data:`, error);
      return [];
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/rajaongkir/city"
      );

      const cities = response.data.rajaongkir.results;
      const warehouseCity = cities.find(
        (city) => city.city_name === warehouseCityName
      );
      const destinationCity = cities.find(
        (city) => city.city_name === destinationCityName
      );

      if (warehouseCity) {
        setWarehouseCityId(warehouseCity.city_id);
      } else {
        console.error("Warehouse city not found");
      }
      if (destinationCity) {
        setDestinationCityId(destinationCity.city_id);
      } else {
        console.error("Destination city not found");
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
        const jneData = await fetchShippingMethods("jne");
        const posData = await fetchShippingMethods("pos");
        const tikiData = await fetchShippingMethods("tiki");
        const combinedData = [...jneData, ...posData, ...tikiData];

        setCourierData(combinedData);
      };

      fetchCourierData();
    }
  }, [warehouseCityId, destinationCityId]);

  const groupService = () => {
    const groupedServices = {};

    courierData.forEach((method) => {
      const courierCode = method.code;
      if (!groupedServices[courierCode]) {
        groupedServices[courierCode] = [];
      }
      groupedServices[courierCode].push(method);
    });

    return groupedServices;
  };

  const handleMenuItemSelect = (service) => {
    const selected = courierData.find((method) => method.service === service);
    setSelectedService(selected);
    // console.log(selected.cost);
  };

  return (
    <>
      <Menu>
        <MenuButton as={Button} rightIcon={<AiOutlineCaretDown />}>
          Shipping Methods
        </MenuButton>
        <MenuList>
          {Object.entries(groupService()).map(
            ([courier, methods], index, array) => (
              <React.Fragment key={courier}>
                <MenuGroup title={courier.toUpperCase()}>
                  {methods.map((method) => (
                    <MenuItem
                      ml={1}
                      key={method.service}
                      onClick={() => handleMenuItemSelect(method.service)}
                    >
                      {method.service} - {method.description}:{" "}
                      {method.cost[0].value} {method.cost[0].etd}
                    </MenuItem>
                  ))}
                </MenuGroup>
                {index !== array.length - 1 && <MenuDivider />}{" "}
              </React.Fragment>
            )
          )}
        </MenuList>
      </Menu>
      <Box mt={2}>
        {selectedService ? (
          <>
            {/* <Text>Selected Service:</Text> */}
            <Text>{selectedService.service}</Text>
            <Text>
              {selectedService.description}: {selectedService.cost[0].value}{" "}
              {selectedService.cost[0].etd}
            </Text>
          </>
        ) : (
          <Text>No service selected</Text>
        )}
      </Box>
    </>
  );
};

export default SelectShipping;
