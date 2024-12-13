import { Router } from 'express';
import { submitResponse } from '../controllers/submitResponse';

const router = Router();

router.post('/', submitResponse);



export default router;