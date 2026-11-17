import { User } from '../../database';
import { ApiError } from '../../utils/api-error';
import { hashPassword } from '../../utils/password';
import {
  PaginationQuery,
  buildPaginatedResponse,
  getPagination,
} from '../../utils/pagination';
import { CreateUserDto, UpdateUserDto } from './users.schema';
import { toPublicUser } from './users.mapper';

export const assertEmailIsFree = async (email: string, currentUserId?: string) => {
  const existingUser = await User.findOne({ where: { email } });

  if (existingUser && existingUser.id !== currentUserId) {
    throw ApiError.conflict('Email is already registered');
  }
};

export const findUserOrFail = async (id: string) => {
  const user = await User.findByPk(id);

  if (!user) {
    throw ApiError.notFound('User not found');
  }

  return user;
};

export const listUsers = async (query: PaginationQuery) => {
  const { rows, count } = await User.findAndCountAll({
    order: [
      ['createdAt', 'DESC'],
      ['id', 'ASC'],
    ],
    ...getPagination(query),
  });

  return buildPaginatedResponse(rows.map(toPublicUser), count, query);
};

export const createUser = async ({ name, email, password, role }: CreateUserDto) => {
  await assertEmailIsFree(email);

  const user = await User.create({ name, email, role, password: await hashPassword(password) });

  return toPublicUser(user);
};

export const updateUser = async (id: string, { password, ...fields }: UpdateUserDto) => {
  const user = await findUserOrFail(id);

  if (fields.email) {
    await assertEmailIsFree(fields.email, user.id);
  }

  await user.update({
    ...fields,
    ...(password && { password: await hashPassword(password) }),
  });

  return toPublicUser(user);
};

export const deleteUser = async (id: string, currentUserId: string) => {
  if (id === currentUserId) {
    throw ApiError.forbidden('You cannot delete your own account');
  }

  const user = await findUserOrFail(id);

  await user.destroy();
};

