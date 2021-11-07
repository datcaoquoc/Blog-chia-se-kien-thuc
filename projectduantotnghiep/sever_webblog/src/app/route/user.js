import express from 'express';  
const routerUser = express.Router();
import Usercontroller from '../controllers/ControllerUser.js';
import {uploaduser} from '../commons/helper/uploadimage.js';
import {validateuser} from '../commons/validate/user.validate.js'
import {resise} from '../commons/middelware/resizeimg.js';
routerUser.post("/changepassword",Usercontroller.changePassword)
routerUser.get("/getprofile",Usercontroller.getProfile)
routerUser.post("/uploadimguser",uploaduser,resise.resizeimg,Usercontroller.uploadImgUser)
// routerUser.post("/isroom/:idroom",Usercontroller.isroom)
routerUser.post("/updateprofile", validateuser.validupdateprofile,uploaduser,Usercontroller.updateProfile)


export default routerUser;