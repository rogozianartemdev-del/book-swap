import { RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';

type RequestPart = 'body' | 'params';

const validatePart =
  (part: RequestPart) =>
  (schema: ZodTypeAny): RequestHandler =>
  (req, _res, next) => {
    req[part] = schema.parse(req[part]);
    next();
  };

export const validateBody = validatePart('body');
export const validateParams = validatePart('params');