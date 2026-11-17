import { AuthSession } from '../entities/User';

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto extends LoginDto {
  name: string;
}

export interface AuthRepository {
  login(dto: LoginDto): Promise<AuthSession>;
  register(dto: RegisterDto): Promise<AuthSession>;
}