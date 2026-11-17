import { Book } from './models/book.model';
import { ExchangeRequest } from './models/exchange-request.model';
import { User } from './models/user.model';
import { sequelize } from './sequelize';

const models = [User, Book, ExchangeRequest];

models.forEach((model) => model.associate());

export { sequelize, User, Book, ExchangeRequest };