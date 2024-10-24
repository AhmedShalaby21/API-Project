import { Router } from 'express';
import { login, signup } from '../controllers/auth.controller.js';
const router = Router();

// User registration route
router.post('/signup', signup);
router.post('/login', login);


export default router;
