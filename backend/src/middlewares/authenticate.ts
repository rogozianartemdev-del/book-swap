import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../modules/auth/token.service';
import { ApiError } from '../utils/api-error';

const BEARER_PREFIX = 'Bearer ';

const extractBearerToken = (header?: string): string => {
  if (!header?.startsWith(BEARER_PREFIX)) {
    throw ApiError.unauthorized('Missing or malformed authorization header');
  }

  return header.slice(BEARER_PREFIX.length);
};

const parseUserFromToken = (token: string) => {
  try {
    return verifyToken(token);
  } catch (error) {
    const message = error instanceof jwt.TokenExpiredError ? 'Token expired' : 'Invalid token';
    throw ApiError.unauthorized(message);
  }
};

export const authenticate: RequestHandler = (req, _res, next) => {
  const token = extractBearerToken(req.headers.authorization);

  req.user = parseUserFromToken(token);
  next();
};