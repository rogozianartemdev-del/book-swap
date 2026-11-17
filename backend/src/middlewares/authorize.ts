import { RequestHandler } from 'express';
import { UserRole } from '../database/models/user.model';
import { ApiError } from '../utils/api-error';
import { getAuthUser } from '../utils/get-auth-user';

export const authorize =
  (...allowedRoles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    const { role } = getAuthUser(req) as { role: UserRole };

    if (!allowedRoles.includes(role)) {
      throw ApiError.forbidden();
    }

    next();
  };