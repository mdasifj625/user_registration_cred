import express from 'express';
import authRouter from './auth/authRouter.js';
import userRouter from './user/userRouter.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/', userRouter);
export default router;
