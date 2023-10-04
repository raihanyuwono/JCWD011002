import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";
import { getQueries } from "../helpers/api";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const TRANSACTION_URL = `${BASE_URL}/report/sales`;

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

async function getTransactions(toast, attributes) {
  try {
    const queries = getQueries(attributes);
    const response = await axios.get(`${TRANSACTION_URL}?${queries}`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response?.status ? response : error));
  }
}

export { getTransactions };
