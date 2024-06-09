import { Router } from 'express';
import { userRouter } from './user';

export const router = Router();

router.get('/hello', (req, res) => {
  return res.send('Home');
});

router.use('/user', userRouter);
