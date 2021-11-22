import { instance } from "../axiosConfig";
const creatPost = async (content, title, category, description,imagepost) => {
  return await instance.post("post/creatpost", {
    content,
    title,
    category, 
    description,
    imagepost,
  }).then((response) => {
    return response.data;
  });
};

const postApi = {
    creatPost
};

export default postApi;