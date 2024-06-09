import { Router } from 'express';
import { registerUserUseCase } from '../use-cases/auth/regiser.use-case';
import { loginUseCase } from '../use-cases/auth/login.use-case';

export const authRouter = Router();

authRouter.post('/register', registerUserUseCase);
authRouter.post('/login', loginUseCase);
