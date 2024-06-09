import { Router } from 'express';
import { getUserUseCase } from '../use-cases/user/get-user.use-case';

export const userRouter = Router();

userRouter.get('/', getUserUseCase);
