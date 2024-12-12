import { Router } from 'express';
import { verifyToken } from '../middleware/userauth';
import { createForm , getUserForms , getFormById , deleteForm } from '../controllers/createForm'; 
import { generateTokenWithFormId } from '../controllers/genToken';

const router = Router();

router.post('/accessurl', verifyToken ,generateTokenWithFormId);
router.get('/forms', verifyToken, getUserForms);
router.get('/:formId', verifyToken, getFormById);
router.post('/create', verifyToken, createForm);
router.delete('/:formId', verifyToken, deleteForm);


export default router;