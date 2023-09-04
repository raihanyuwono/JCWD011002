import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;

function getToken() {
  return localStorage.getItem("token");
}

function setHeaders() {
  return {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };
}

async function register(toast, attributes) {
  try {
    const response = await axios.post(`${AUTH_URL}/user`, attributes);
    notification(toast, setToastParams(response));
  } catch (error) {
    notification(toast, setToastParams(error.response));
  }
}

export { register };
