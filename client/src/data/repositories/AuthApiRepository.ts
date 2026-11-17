
import { AuthRepository, LoginDto, RegisterDto } from '@/domain/repositories/AuthRepository';
import { httpClient } from '../http/httpClient';
import { AuthSession } from '@/domain/entities/User';

export class AuthApiRepository implements AuthRepository {
    login = async (dto: LoginDto) =>
        (await httpClient.post<AuthSession>('/auth/login', dto)).data;

    register = async (dto: RegisterDto) =>
        (await httpClient.post<AuthSession>('/auth/register', dto)).data;

}