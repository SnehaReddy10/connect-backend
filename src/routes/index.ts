import { Router } from 'express';
import { userRouter } from './user';
import { authRouter } from './auth';
import { issueRouter } from './issue';

export const router = Router();

router.use('/auth', authRouter);

router.use('/user', userRouter);
router.use('/issue', issueRouter);
