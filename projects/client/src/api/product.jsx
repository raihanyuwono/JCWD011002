import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
import { getQueries } from "../helpers/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const PRODUCT_URL = `${BASE_URL}/product`;

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

async function getProducts(toast, attributes) {
  try {
    const queries = getQueries(attributes);
    const response = await axios.get(`${PRODUCT_URL}?${queries}`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

export { getProducts };
