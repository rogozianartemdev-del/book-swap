import type { User } from '../../database';

export const toPublicUser = ({ id, name, email, role, avatarUrl, createdAt }: User) => ({id,name,email,role,avatarUrl,createdAt,});
