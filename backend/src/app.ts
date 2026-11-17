import cors from 'cors'
import express from 'express'
import { authRouter } from './modules/auth/auth.routes';
import { errorHandler } from './middlewares/error-handler';
import { booksRouter, myBooksRouter } from './modules/books/books.routes';
import { usersRouter } from './modules/users/users.routes';
import { exchangeRouter, myExchangeRequestsRouter } from './modules/exchange/exchange.routes';
import { authenticate } from './middlewares/authenticate';
import { UPLOADS_DIR } from './utils/uploads';
import { authRateLimiter } from './middlewares/rate-limiter';
import { profileRouter } from './modules/profiles/profile.routes';
import  morgan from 'morgan';
export const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy'});
})

app.use(morgan('dev'));

app.use('/uploads', express.static(UPLOADS_DIR));
app.use('/auth',authRateLimiter ,authRouter);

app.use(authenticate);

app.use('/books', booksRouter);
app.use('/books', exchangeRouter);
app.use('/me/books', myBooksRouter);
app.use('/me/exchange-requests', myExchangeRequestsRouter);
app.use('/me/profile', profileRouter);
app.use('/users', usersRouter);

app.use(errorHandler);