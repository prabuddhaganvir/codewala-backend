
import { Router } from 'express';
import { Logout, Login, Signup } from '../controllers/authController.js';

const router = Router();

router.post('/signup',Signup)
router.post('/login',Login)
router.post('/logout',Logout)

export default router;