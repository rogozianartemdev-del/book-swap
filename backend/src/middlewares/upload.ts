import { randomUUID } from 'crypto';
import multer from 'multer';
import path from 'path';
import { ApiError } from '../utils/api-error';
import { UPLOADS_DIR } from '../utils/uploads';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const storage = multer.diskStorage({
  destination: UPLOADS_DIR,
  filename: (_req, file, callback) =>
    callback(null, `${randomUUID()}${path.extname(file.originalname)}`),
});

const createImageUploader = (fieldName: string) =>
  multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
    fileFilter: (_req, file, callback) => {
      if (ALLOWED_MIME_TYPES.includes(file.mimetype)) {
        return callback(null, true);
      }

      callback(ApiError.badRequest('Only JPEG, PNG and WebP images are allowed'));
    },
  }).single(fieldName);

export const uploadBookCover = createImageUploader('file');
export const uploadAvatar = createImageUploader('avatar');