import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USER_URL = `${BASE_URL}/user`;
const AUTH_URL = `${BASE_URL}/auth`;
const ADMIN_URL = `${BASE_URL}/admin`;

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

async function getUsers(toast) {
  try {
    const response = await axios.get(`${USER_URL}`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

async function getRoles(toast) {
  try {
    const response = await axios.get(`${ADMIN_URL}/roles`, setHeaders());
    return response.data;
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
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

async function updateAdmin(toast, id, attributes) {
  try {
    const response = await axios.patch(
      `${ADMIN_URL}/user/${id}`,
      attributes,
      setHeaders()
    );
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getUsers, getRoles, register, updateAdmin };
