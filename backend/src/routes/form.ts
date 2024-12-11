import { Router } from 'express';
import { verifyToken } from '../middleware/userauth';
import { createForm , getUserForms , getFormById , deleteForm } from '../controllers/createForm'; 

const router = Router();

router.get('/:formId', verifyToken, getFormById);
router.post('/create', verifyToken, createForm);
router.get('/forms', verifyToken, getUserForms);
router.delete('/:formId', verifyToken, deleteForm);


export default router;