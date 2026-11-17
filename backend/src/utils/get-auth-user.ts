import { Request } from 'express';
import type { TokenPayload } from '../modules/auth/token.service';
import { ApiError } from './api-error';

export const getAuthUser = (req: Request): TokenPayload => {
  if (!req.user) {
    throw ApiError.unauthorized();
  }

  return req.user;
};