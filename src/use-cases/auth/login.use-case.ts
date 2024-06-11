import { z } from 'zod';
import { USER } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

const loginUserSchema = z.object({
  email: z.string().email({ message: USER.INVALID_EMAIL }),
  password: z.string(),
});

export const loginUseCase = async (req: any, res: any) => {
  try {
    const { success, data, error } = loginUserSchema.safeParse(req.body);

    if (!success) {
      return res
        .status(STATUS_CODES.BadRequest)
        .json({ error: error.errors[0].message });
    }

    const user = await User.find({ email: data.email });

    if (user.length <= 0) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: USER.USER_NOT_FOUND });
    }

    const isValid = bcrypt.compareSync(data.password, user[0].password ?? '');

    if (!isValid) {
      return res
        .status(STATUS_CODES.BadRequest)
        .json({ error: USER.INVALID_CREDENTIALS });
    }

    const token = jsonwebtoken.sign(
      { id: user[0]._id },
      process.env.JWT_SECRET ?? ''
    );

    return res.json({ token });
  } catch (err) {
    console.log('Login-User-Failed', err);
    return res.status(STATUS_CODES.ServiceUnavailable).send();
  }
};
