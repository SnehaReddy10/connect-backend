import { Router } from 'express';
import { registerUserUseCase } from '../use-cases/user/regiser.use-case';

export const userRouter = Router();

userRouter.get('/');
userRouter.post('/', registerUserUseCase);
