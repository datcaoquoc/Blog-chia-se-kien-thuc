import { instance } from "../axiosConfig";
const uploadimgpost = async (file,width, height) => {
  let formData = new FormData();
  formData.append("image", file);
  // const response = await instance.post(`post/uploadimage?w=${width}&h=${height}`, formData)
  // if(response){
  //   return response.data;
  // }else{
  //   console.log('cc')
  // }
  return await instance.post(`post/uploadimage?w=${width}&h=${height}`, formData).then((response) => {
    return response.data;
  });
};

const uploadService = {
    uploadimgpost
};

export default uploadService;