import { COMMON, USER } from '../constants/error-messages';
import { STATUS_CODES } from '../constants/status-codes';
import { User } from '../models/user.model';
import jsonwebtoken from 'jsonwebtoken';

export const authMiddleware = async (req: any, res: any, next: any) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.slice(7, authorizationHeader.length);
    const data: any = jsonwebtoken.verify(token, process.env.JWT_SECRET ?? '');

    const user = await User.findById(data.id);

    if (!user) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: USER.USER_NOT_FOUND });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log('Auth Middleware Failed', err);
    return res
      .status(STATUS_CODES.ServiceUnavailable)
      .json({ error: COMMON.SERVICE_UNAVAILABLE });
  }
};
