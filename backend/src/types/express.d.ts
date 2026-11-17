import type { TokenPayload } from '../modules/auth/token.service';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export {};