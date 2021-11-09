import axios from "axios";

const API_URL = "http://localhost:3800/";

const register = (name, email, password) => {
  return axios.post(API_URL + "auth/register", {
    name,
    email,
    password,
  }).then((response) => {
    return response.data;
  });
};

const login = (email, password) => {
  return axios
    .post(API_URL + "auth/login", {
      email,
      password,
    },{withCredentials: true, credentials: 'include'})
    .then((response) => {
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const verifiCode = (code, email) => {
  return axios
  .post(API_URL + "auth/verificationcodes", {
    code,
    email,
  }).then((response) => {
    return response.data;
  });
}

const renderOtp = (email) => {
  return axios
  .post(API_URL + "auth/resendcode", {
    email,
  }).then((response) => {
    return response.data;
  });
}

const authService = {
  register,
  login,
  logout,
  verifiCode,
  renderOtp
};

export default authService;