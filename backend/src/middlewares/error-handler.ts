import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import { ApiError } from '../utils/api-error';
import { MulterError } from 'multer';
import { buildFileUrl, removeUploadedFile } from '../utils/uploads';

export const errorHandler: ErrorRequestHandler = async (error, req, res, _next) => {
    if (req.file) {
        await removeUploadedFile(buildFileUrl(req.file.filename));
    }
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    }

    if (error instanceof ZodError) {
        return res
            .status(400)
            .json({ message: 'Validation failed', errors: error.flatten().fieldErrors });
    }

    if (error instanceof MulterError) {
        return res.status(400).json({ message: error.message });
    }

    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
};