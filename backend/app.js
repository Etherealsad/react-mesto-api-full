const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const bodyParser = require('body-parser');
const NotFoundError = require('./errors/not-found-errors');
const { handleError } = require('./utils/handleError');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://localhost:3000',
  'http://api.ethereal.students.nomoredomains.icu',
  'https://api.ethereal.students.nomoredomains.icu',
];

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
});

app.use(bodyParser.json());

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {
  // useNewUrlParser: true,
});

app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/https?:\/\/(w{3}.)?(\S)*\.\w{2,3}((\/\w+)+(\/\S+)+)?/),
  }),
}), createUser);

app.use(auth);

app.use('/', require('./routes/cards'));
app.use('/', require('./routes/users'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Requested path not found'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Ссылка на сервер: http://localhost:${PORT}`);
});
