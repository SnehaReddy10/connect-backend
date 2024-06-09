import { IUser } from '../interfaces/user.interface';

export const mapUser = (user: any) => {
  const newUser: IUser = {
    id: user._id,
    username: user.username,
    email: user.email,
    name: user.email,
  };
  return newUser;
};
