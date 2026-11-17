import { PageQuery, Paginated } from '../entities/Pagination';
import { User, UserRole } from '../entities/User';

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UpdateUserDto = Partial<CreateUserDto>;

export interface UsersRepository {
  list(query: PageQuery): Promise<Paginated<User>>;
  create(dto: CreateUserDto): Promise<User>;
  update(id: string, dto: UpdateUserDto): Promise<User>;
  remove(id: string): Promise<void>;
}