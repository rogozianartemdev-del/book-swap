import { asyncHandler } from '../../utils/async-handler';
import { getAuthUser } from '../../utils/get-auth-user';
import * as exchangeService from './exchange.service';

export const requestExchange = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.status(201).json(await exchangeService.requestExchange(String(req.params.id), userId));
});

export const listIncomingRequests = asyncHandler(async (req, res) => {
  const { userId } = getAuthUser(req);

  res.json(await exchangeService.listIncomingRequests(userId));
});