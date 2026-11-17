import { User } from '../../database';
import { ApiError } from '../../utils/api-error';
import { hashPassword, verifyPassword } from '../../utils/password';
import { toPublicUser } from '../users/users.mapper';
import { LoginDto, RegisterDto } from './auth.shema';
import { generateToken } from './token.service';

const buildAuthResponse = (user: User) => ({
  token: generateToken({ userId: user.id, role: user.role }),
  user: toPublicUser(user),
});

export const register = async ({ name, email, password }: RegisterDto) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw ApiError.conflict('Email is already registered');
  }

  const user = await User.create({ name, email, password: await hashPassword(password) });

  return buildAuthResponse(user);
};

export const login = async ({ email, password }: LoginDto) => {
  const user = await User.findOne({ where: { email } });
  const isPasswordValid = user ? await verifyPassword(password, user.password) : false;

  if (!user || !isPasswordValid) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  return buildAuthResponse(user);
};