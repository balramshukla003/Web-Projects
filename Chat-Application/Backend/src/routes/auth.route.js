import express from 'express';
import { signup, login, updateProfile, allUsers, checkAuth } from '../controller/auth.controller.js';
import { protectedRoute } from '../middleware/protectedRoute.js';

const router = express.Router();

router.post('/signUp', signup)
router.post('/login', login)

router.put('/update-profile', protectedRoute, updateProfile)

router.get('/check', protectedRoute, checkAuth)
router.get('/alluser', protectedRoute, allUsers)



export default router;