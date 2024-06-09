import { Router } from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';
import { authMiddleware } from '../middlewares/auth';

export const router = Router();

router.use('/auth', authRouter);

router.use(authMiddleware);
router.use('/user', userRouter);
