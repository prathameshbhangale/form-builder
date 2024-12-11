import { Router } from 'express';
import {registerUser }  from '../controllers/auth';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/userauth';
import { login } from '../controllers/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);



export default router;