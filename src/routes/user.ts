import { Router } from 'express';
import { getUserUseCase } from '../use-cases/user/get-user.use-case';
import { authMiddleware } from '../middlewares/auth';

export const userRouter = Router();

userRouter.use(authMiddleware);
userRouter.get('/', getUserUseCase);
