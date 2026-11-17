import { Book, User } from '../../database';
import { buildFileUrl, removeUploadedFile } from '../../utils/uploads';
import { toPublicUser } from '../users/users.mapper';
import { assertEmailIsFree, findUserOrFail } from '../users/users.service';
import { UpdateProfileDto } from './profile.schema';

const buildProfile = async (user: User) => ({
  ...toPublicUser(user),
  booksCount: await Book.count({ where: { ownerId: user.id } }),
});

export const getProfile = async (userId: string) => {
  const user = await findUserOrFail(userId);

  return buildProfile(user);
};

export const updateProfile = async (
  userId: string,
  fields: UpdateProfileDto,
  avatar?: Express.Multer.File,
) => {
  const user = await findUserOrFail(userId);
  const previousAvatarUrl = user.avatarUrl;

  if (fields.email) {
    await assertEmailIsFree(fields.email, user.id);
  }

  await user.update({
    ...fields,
    ...(avatar && { avatarUrl: buildFileUrl(avatar.filename) }),
  });

  if (avatar && previousAvatarUrl) {
    await removeUploadedFile(previousAvatarUrl);
  }

  return buildProfile(user);
};