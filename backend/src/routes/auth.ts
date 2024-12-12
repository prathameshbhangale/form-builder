import { Router } from 'express';
import {registerUser }  from '../controllers/auth';
import { login } from '../controllers/auth';

const router = Router();

router.post('/register', registerUser);
router.post('/login', login);



export default router;