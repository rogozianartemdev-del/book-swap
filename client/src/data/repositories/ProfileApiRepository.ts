import { ExchangeRequest } from '@/domain/entities/ExchangeRequest';
import { Profile } from '@/domain/entities/User';
import {
  ProfileRepository,
  UpdateProfileDto,
} from '@/domain/repositories/ProfileRepository';
import { httpClient } from '../http/httpClient';
import { toFormData } from '../http/toFormData';

export class ProfileApiRepository implements ProfileRepository {
  get = async () => (await httpClient.get<Profile>('/me/profile')).data;

  update = async ({ name, email, avatar }: UpdateProfileDto) =>
    (await httpClient.patch<Profile>('/me/profile', toFormData({ name, email, avatar }))).data;

  listIncomingRequests = async () =>
    (await httpClient.get<ExchangeRequest[]>('/me/exchange-requests')).data;
}