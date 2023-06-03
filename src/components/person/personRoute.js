import { Router } from 'express';
import { addPersion, getPerson } from './personController.js';

const router = Router();

router.post('/', addPersion);
router.get('/', getPerson);

export default router;
