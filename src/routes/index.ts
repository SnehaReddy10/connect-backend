import { Router } from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';

export const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
