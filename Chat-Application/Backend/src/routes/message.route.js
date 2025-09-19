import express from 'express';
import { protectedRoute } from '../middleware/protectedRoute.js';

import { getAllUsers, getMesssages, sendMessage } from '../controller/message.controller.js';


const router = express.Router();


router.get('/users', protectedRoute, getAllUsers);

router.get('/:id', protectedRoute, getMesssages);

router.post("/send/:id", protectedRoute, sendMessage);




export default router;