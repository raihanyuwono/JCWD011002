import React, { useEffect, useState } from "react";
import axios from "axios";
const Warehouses = [
  {
    latitude: 3.6368006583078705,
    longitude: 98.64717392851594,
  },
  {
    latitude: -6.229723621991315,
    longitude: 106.6877015198725,
  },
  {
    latitude: -8.028559029409175,
    longitude: 112.66997415795586,
  },
  {
    latitude: -9.462380744477683,
    longitude: 123.95889739985925,
  },
];

function CalcDistance() {
  const [myLatitude, setMyLatitude] = useState(null);
  const [myLongitude, setMyLongitude] = useState(null);
  const [warehouseCityName, setWarehouseCityName] = useState("");

  useEffect(() => {
    const storedLatitude = parseFloat(localStorage.getItem("myLatitude"));
    const storedLongitude = parseFloat(localStorage.getItem("myLongitude"));

    if (!isNaN(storedLatitude) && !isNaN(storedLongitude)) {
      setMyLatitude(storedLatitude);
      setMyLongitude(storedLongitude);
    }
  }, []);

  useEffect(() => {
    let nearestDistance = Infinity;
    let nearestWarehouseIndex = -1;

    Warehouses.forEach((warehouse, index) => {
      const distance = calculateDistance(
        myLatitude,
        myLongitude,
        warehouse.latitude,
        warehouse.longitude
      );

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestWarehouseIndex = index;
      }
    });

    if (nearestWarehouseIndex !== -1) {
      const nearestWarehouse = Warehouses[nearestWarehouseIndex];
      const { latitude, longitude } = nearestWarehouse;
      fetchData(latitude, longitude)
        .then((cityName) => setWarehouseCityName(cityName))
        .catch((error) => console.error("Error fetching city name:", error));
    }
  }, [myLatitude, myLongitude]);

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const radLat1 = (Math.PI * lat1) / 180;
    const radLat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radTheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radLat1) * Math.sin(radLat2) +
      Math.cos(radLat1) * Math.cos(radLat2) * Math.cos(radTheta);
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist;
  }

  async function fetchData(latitude, longitude) {
    const apiKey = "AIzaSyCMmNBOvjg1DljJCkujD9OrFWXN7655bJE";
    const language = "id";

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}&language=${language}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;
      const cityName = extractData(data);
      return cityName;
    } catch (error) {
      console.error("Error fetching city name:", error);
      throw error;
    }
  }

  function extractData(data) {
    const compoundCode = data.plus_code.compound_code;
    console.log(compoundCode);
    if (compoundCode) {
      const cityNameMatch = compoundCode.match(/, (\w[^,]+)/);
      if (cityNameMatch && cityNameMatch.length > 1) {
        let cityName = cityNameMatch[1];
        if (cityName.startsWith("Kota ")) {
          // remove "Kota"
          cityName = cityName.replace(/^Kota /i, "");
        } else if (cityName.startsWith("Kabupaten ")) {
          // remove "Kabupaten"
          cityName = cityName.replace(/^Kabupaten /i, "");
        }
        console.log("City Name:", cityName);
        localStorage.setItem("wh_city", cityName);
        return cityName;
      }
    }
    return "";
  }

  return <></>;
}

export default CalcDistance;
