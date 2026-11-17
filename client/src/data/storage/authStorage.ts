import { AuthSession } from '@/domain/entities/User';

const STORAGE_KEY = 'auth_session';

export const authStorage = {
  get(): AuthSession | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthSession) : null;
  },
  save(session: AuthSession) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  },
  clear() {
    localStorage.removeItem(STORAGE_KEY);
  },
  getToken(): string | null {
    return this.get()?.token ?? null;
  },
};