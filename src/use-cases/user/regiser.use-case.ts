import { z } from 'zod';
import { USER } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { User } from '../../models/user.model';
import { mapUser } from '../../mapper/user.mapper';
import bcrypt from 'bcrypt';

const registerUserSchema = z.object({
  username: z.string({
    message: USER.INVALID_USERNAME,
  }),
  name: z.string({
    message: USER.INVALID_NAME,
  }),
  email: z
    .string({
      message: USER.INVALID_EMAIL,
    })
    .email({ message: USER.INVALID_EMAIL }),
  password: z
    .string({
      message: USER.INVALID_PASSWORD,
    })
    .min(8, { message: USER.PASSWORD_MIN_8 }),
});

export const registerUserUseCase = async (req: any, res: any) => {
  try {
    const { success, data, error } = registerUserSchema.safeParse(req.body);

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(STATUS_CODES.BadRequest).json({ errors });
    }

    const existingUser = await User.find({ email: data.email });
    if (existingUser.length > 0) {
      return res
        .status(STATUS_CODES.BadRequest)
        .json({ error: USER.USER_ALREADY_EXISTS });
    }

    const hashedPassword = bcrypt.hashSync(data.password, 8);
    data.password = hashedPassword;

    const user = new User(data);
    await user.save();

    const mappedUser = mapUser(user);
    return res.send(mappedUser);
  } catch (err) {
    console.log('Register-User-Failed', err);
    return res.status(STATUS_CODES.ServiceUnavailable).send();
  }
};
