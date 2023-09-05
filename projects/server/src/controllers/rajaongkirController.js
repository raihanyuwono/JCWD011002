const axios = require("axios");
const headers = {
  headers: {
    key: "7d254ee5a1cdeffa9f45a68c11883e43",
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
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCity,
  getProvince,
  getCost,
};
