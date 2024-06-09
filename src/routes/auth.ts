import { Router } from 'express';
import { registerUserUseCase } from '../use-cases/user/regiser.use-case';
import { loginUseCase } from '../use-cases/user/login.use-case';

export const authRouter = Router();

authRouter.post('/register', registerUserUseCase);
authRouter.post('/login', loginUseCase);
