import { Router } from 'express';
import { uploadAvatar } from '../../middlewares/upload';
import { validateBody } from '../../middlewares/validate';
import { getProfile, updateProfile } from './profile.controller';
import { updateProfileSchema } from './profile.schema';

export const profileRouter = Router();

profileRouter.get('/', getProfile);
profileRouter.patch('/', uploadAvatar, validateBody(updateProfileSchema), updateProfile);