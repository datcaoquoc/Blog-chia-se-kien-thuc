import { instance } from "../../../commons/axios/axiosConfig";

const getPostByCategory = async () => {
  return await instance.get("/gethomeblogs").then((response) => {
    return response.data;
  });
};
const getPostNew = async () => {
  return await instance.get("/getpostnew").then((response) => {
    return response.data;
  });
};

const homeService = {
  getPostByCategory,
    getPostNew
};

export default homeService;