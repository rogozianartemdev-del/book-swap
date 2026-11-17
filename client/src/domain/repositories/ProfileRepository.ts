import { ExchangeRequest } from '../entities/ExchangeRequest';
import { Profile } from '../entities/User';

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  avatar?: File;
}

export interface ProfileRepository {
  get(): Promise<Profile>;
  update(dto: UpdateProfileDto): Promise<Profile>;
  listIncomingRequests(): Promise<ExchangeRequest[]>;
}