import axios from "axios";
import notification, { setToastParams } from "../helpers/Notification";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;
const USER_URL = `${BASE_URL}/user`;

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

const getUser = async (token, setUserData, toast) => {
  try {
    const response = await axios.get(`${USER_URL}`, setHeaders(token));
    setUserData(response.data.data);
    console.log(response.data.data);
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const updateUser = async (token, toast, userData) => {
  try {
    const response = await axios.patch(`${USER_URL}`, userData, setHeaders(token));
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

const updateAvatar = async (token, toast, file) => {
  try {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await axios.patch(`${USER_URL}`, formData, setHeaders(token));
    notification(toast, setToastParams(response));
  } catch (error) {
    const { response } = error;
    notification(toast, setToastParams(response.status ? response : error));
  }
}

export { getUser, updateUser, updateAvatar };