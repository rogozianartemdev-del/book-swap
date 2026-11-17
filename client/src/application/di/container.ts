import { AuthApiRepository } from '@/data/repositories/AuthApiRepository';
import { BooksApiRepository } from '@/data/repositories/BooksApiRepository';
import { ProfileApiRepository } from '@/data/repositories/ProfileApiRepository';
import { UsersApiRepository } from '@/data/repositories/UsersApiRepository';
import { AuthRepository } from '@/domain/repositories/AuthRepository';
import { BooksRepository } from '@/domain/repositories/BooksRepository';
import { ProfileRepository } from '@/domain/repositories/ProfileRepository';
import { UsersRepository } from '@/domain/repositories/UsersRepository';

interface Container {
  authRepository: AuthRepository;
  booksRepository: BooksRepository;
  usersRepository: UsersRepository;
  profileRepository: ProfileRepository;
}

export const container: Container = {
  authRepository: new AuthApiRepository(),
  booksRepository: new BooksApiRepository(),
  usersRepository: new UsersApiRepository(),
  profileRepository: new ProfileApiRepository(),
};