import { asyncHandler } from '../../utils/async-handler';
import { getAuthUser } from '../../utils/get-auth-user';
import * as profileService from './profile.service';

export const getProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.json(await profileService.getProfile(userId));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.json(await profileService.updateProfile(userId, req.body, req.file));
});