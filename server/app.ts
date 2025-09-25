import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import indexRouter from './src/routes/index';
import usersRouter from './src/routes/users';
import affirmRouter from './src/routes/affirmation';

const app = express();

const port = 3001;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/affirmation', affirmRouter);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
