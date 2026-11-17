export type UserRole = 'user' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Profile extends User {
  booksCount: number;
}

export interface AuthSession {
  token: string;
  user: User;
}