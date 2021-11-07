import express from 'express';  
const routerFreedom = express.Router();
import FreedomPathController from '../controllers/ControllerfreedomPath.js'
import { serviceFind } from '../commons/helper/checklimit.js';

routerFreedom.get('/postbycategory',serviceFind.limit,  FreedomPathController.getPostByCategory);
routerFreedom.get('/getpostnew',serviceFind.limit,  FreedomPathController.getPostnew);

export default routerFreedom;