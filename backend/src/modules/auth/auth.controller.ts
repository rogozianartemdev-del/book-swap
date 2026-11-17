import { asyncHandler } from '../../utils/async-handler';
import * as authService from './auth.service';

export const register = asyncHandler(async (req, res) => {
  const authResponse = await authService.register(req.body);

  res.status(201).json(authResponse);
});

export const login = asyncHandler(async (req, res) => {
  const authResponse = await authService.login(req.body);

  res.json(authResponse);
});