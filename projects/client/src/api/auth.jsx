import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const AUTH_URL = `${BASE_URL}/auth`;

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

async function register(toast, attributes) {
  try {
    const response = await axios.post(`${AUTH_URL}/user`, attributes);
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function registration(toast, token, attributes) {
  try {
    const response = await axios.put(
      `${AUTH_URL}/user`,
      attributes,
      setHeaders(token)
    );
    notification(toast, setToastParams(response));
    setTimeout(() => (document.location.href = "/"), 2500);
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { register, registration };
