const path = require("path");
const axios = require("axios");
require("dotenv").config({
  path: path.resolve(__dirname, "../../.env"),
});

const headers = {
  headers: {
    key: process.env.RAJAONGKIR_KEY,
  },
};

const getCity = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/city",
      headers
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};

const getProvince = async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.rajaongkir.com/starter/province",
      headers
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};

const getCost = async (req, res) => {
  try {
    const { origin, destination, weight, courier } = req.body;
    const response = await axios.post(
      `https://api.rajaongkir.com/starter/cost`,
      {
        origin,
        destination,
        weight,
        courier,
      },
      headers
    );
    res.send(response.data);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getCity,
  getProvince,
  getCost,
};
