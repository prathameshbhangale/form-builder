import { Router } from 'express';
import { insertField , deleteField , updateField , getAllFields, insertManyFields } from '../controllers/fieldController';
import { verifyToken } from '../middleware/userauth';

const router = Router();

router.post('/insert', verifyToken ,insertField);
router.post('/insertmany', verifyToken ,insertManyFields);
router.delete('/:fieldId', verifyToken ,deleteField);
router.post('/update/:fieldId', verifyToken ,updateField);
router.get('/', verifyToken ,getAllFields);

export default router;