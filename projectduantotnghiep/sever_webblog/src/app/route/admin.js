import express from 'express';  
const routerAdmin = express.Router();
import Admincontroler from '../controllers/ControlerAdmin.js';

routerAdmin.get('/getlistuser/:role/:page', Admincontroler.getListUser)
routerAdmin.post('/deleteuser', Admincontroler.deleteUser)
routerAdmin.get('/findusersbyname', Admincontroler.findUsersByName)
routerAdmin.get('/findusersbyemail', Admincontroler.findUsersByEmail)
routerAdmin.post('/addCategory', Admincontroler.addCategory)


export default routerAdmin;
