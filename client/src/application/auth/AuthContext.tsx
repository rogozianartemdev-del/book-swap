import { authStorage } from '@/data/storage/authStorage';
import { User } from '@/domain/entities/User';
import { LoginDto, RegisterDto } from '@/domain/repositories/AuthRepository';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { container } from '../di/container';

interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  login: (dto: LoginDto) => Promise<void>;
  register: (dto: RegisterDto) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const [user, setUserState] = useState<User | null>(() => authStorage.get()?.user ?? null);

  const value = useMemo<AuthContextValue>(() => {
    const startSession = async (request: Promise<{ token: string; user: User }>) => {
      const session = await request;

      authStorage.save(session);
      setUserState(session.user);
    };

    return {
      user,
      isAdmin: user?.role === 'admin',
      login: (dto) => startSession(container.authRepository.login(dto)),
      register: (dto) => startSession(container.authRepository.register(dto)),
      logout: () => {
        authStorage.clear();
        queryClient.clear();
        setUserState(null);
      },
      setUser: (nextUser) => {
        const session = authStorage.get();

        if (session) {
          authStorage.save({ ...session, user: nextUser });
        }
        setUserState(nextUser);
      },
    };
  }, [user, queryClient]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};