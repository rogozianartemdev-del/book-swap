import { Router } from 'express';
import { validateBody } from '../../middlewares/validate';
import { login, register } from './auth.controller';
import { loginSchema, registerSchema } from './auth.shema';

export const authRouter = Router();

authRouter.post('/register', validateBody(registerSchema), register);
authRouter.post('/login', validateBody(loginSchema), login);