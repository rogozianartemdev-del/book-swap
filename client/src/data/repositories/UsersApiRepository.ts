import { Paginated, PageQuery } from '@/domain/entities/Pagination';
import { User } from '@/domain/entities/User';
import {
  CreateUserDto,
  UpdateUserDto,
  UsersRepository,
} from '@/domain/repositories/UsersRepository';
import { httpClient } from '../http/httpClient';

export class UsersApiRepository implements UsersRepository {
  list = async (query: PageQuery) =>
    (await httpClient.get<Paginated<User>>('/users', { params: query })).data;

  create = async (dto: CreateUserDto) => (await httpClient.post<User>('/users', dto)).data;

  update = async (id: string, dto: UpdateUserDto) =>
    (await httpClient.patch<User>(`/users/${id}`, dto)).data;

  remove = async (id: string) => {
    await httpClient.delete(`/users/${id}`);
  };
}