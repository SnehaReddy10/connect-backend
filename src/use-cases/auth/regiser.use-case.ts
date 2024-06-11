import { z } from 'zod';
import { USER } from '../../constants/error-messages';
import { STATUS_CODES } from '../../constants/status-codes';
import { User } from '../../models/user.model';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

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
      return res
        .status(STATUS_CODES.BadRequest)
        .json({ error: error.errors[0].message });
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

    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET ?? ''
    );

    return res.json({ token });
  } catch (err) {
    console.log('Register-User-Failed', err);
    return res.status(STATUS_CODES.ServiceUnavailable).send();
  }
};
