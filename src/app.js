import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import mocksRouter from './routes/mocks.router.js';
import errorHandler from './middlewares/errorHandler.js';

import usersRouter from './routes/usuarios.router.js';
import petsRouter from './routes/mascotas.router.js';
import adoptionsRouter from './routes/adopciones.router.js';
import sessionsRouter from './routes/sessions.router.js';
import config from './config/config.js';
import __dirname from './utils.js';

const app = express();
const PORT = config.app.PORT;
const MONGO_URI = config.mongo.URL;
const PUBLIC_DIR = `${__dirname}/public`;

const server = app.listen(PORT, () => {
  console.log(`Server on en ${PORT}`);
}).on('error', (err) => {
  console.error('Errora a liniciar el server', err);
});

mongoose.connect(MONGO_URI,)
  .then(() => console.log('Connectado a la base de datos'))
  .catch(err => console.error('Error de conectando con mongo', err));

// MIDDLEWARES
app.use(express.static(PUBLIC_DIR));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// RUTAS GENERALES
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

app.use(errorHandler);
