import { Router } from 'express';
import { authorize } from '../../middlewares/authorize';
import { validateBody, validateParams } from '../../middlewares/validate';
import { UserRole } from '../../database/models/user.model';
import { idParamSchema } from '../../utils/id-param.schema';
import { createUser, deleteUser, listUsers, updateUser } from './users.controller';
import { createUserSchema, updateUserSchema } from './users.schema';

export const usersRouter = Router();

usersRouter.use(authorize(UserRole.Admin));

usersRouter.get('/', listUsers);
usersRouter.post('/', validateBody(createUserSchema), createUser);
usersRouter.patch('/:id', validateParams(idParamSchema), validateBody(updateUserSchema), updateUser);
usersRouter.delete('/:id', validateParams(idParamSchema), deleteUser);