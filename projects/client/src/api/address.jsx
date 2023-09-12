import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const RAJA_ONGKIR_URL = `${BASE_URL}/rajaongkir`;

function getToken() {
  return localStorage.getItem("token");
}

function setHeaders(token) {
  return {
    headers: {
      Authorization: `Bearer ${token || getToken()}`,
    },
  };
}

const getProvince = async (setProvince, toast) => {
  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/province`);
    setProvince(response.data.rajaongkir.results);
    console.log('response province', response.data.rajaongkir.results);
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const getCityByProvince = async (province, setCity, toast) => {
  try {
    const response = await axios.get(`${RAJA_ONGKIR_URL}/citybyprovince?province=${province}`);
    setCity(response.data.rajaongkir.results);
    console.log('response city', response.data.rajaongkir.results);
  } catch (error) {
    console.log(error);
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getProvince, getCityByProvince };