import { rm } from 'fs/promises';
import path from 'path';

export const UPLOADS_DIR = path.resolve(process.cwd(), 'uploads');
const UPLOADS_URL_PREFIX = '/uploads';

export const buildFileUrl = (filename: string) => `${UPLOADS_URL_PREFIX}/${filename}`;

export const removeUploadedFile = (fileUrl: string) =>
    rm(path.join(UPLOADS_DIR, path.basename(fileUrl)), { force: true });
