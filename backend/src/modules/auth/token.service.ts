import jwt, { SignOptions } from "jsonwebtoken";
import { env } from "../../config/config-env";


export interface TokenPayload {
    userId: string;
    role: 'user' | 'admin';
}

const signOptions: SignOptions = {
    expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
}

export const generateToken = (payload: TokenPayload): string => jwt.sign(payload, env.JWT_SECRET, signOptions);

export const verifyToken = (token: string): TokenPayload => {
    const { userId, role } = jwt.verify(token, env.JWT_SECRET) as TokenPayload;
    return { userId, role };
}

