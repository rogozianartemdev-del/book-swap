import { asyncHandler } from '../../utils/async-handler';
import { getAuthUser } from '../../utils/get-auth-user';
import { paginationQuerySchema } from '../../utils/pagination';
import * as usersService from './users.service';

export const listUsers = asyncHandler(async (req, res) => {
  const query = paginationQuerySchema.parse(req.query);

  res.json(await usersService.listUsers(query));
});

export const createUser = asyncHandler(async (req, res) => {
  res.status(201).json(await usersService.createUser(req.body));
});

export const updateUser = asyncHandler(async (req, res) => {
  res.json(await usersService.updateUser(String(req.params.id), req.body));
});

export const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  await usersService.deleteUser(String(req.params.id), userId);
  res.status(204).send();
});