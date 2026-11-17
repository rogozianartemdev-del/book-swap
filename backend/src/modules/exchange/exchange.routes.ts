import { Router } from 'express';
import { validateParams } from '../../middlewares/validate';
import { idParamSchema } from '../../utils/id-param.schema';
import { listIncomingRequests, requestExchange } from './exchange.controller';

export const exchangeRouter = Router();

exchangeRouter.post('/:id/exchange', validateParams(idParamSchema), requestExchange);

export const myExchangeRequestsRouter = Router();

myExchangeRequestsRouter.get('/', listIncomingRequests);