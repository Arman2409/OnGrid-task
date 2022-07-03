import express from 'express';
import sessions from 'express-session';
import normalizePort from 'normalize-port';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';

import logger from './tools/logger.js';

// controllers 
import authenticate from './controllers/authenticate.js';
import logIn from './controllers/signIn.js';

dotenv.config();
const app = express();

// middlewares 
app.use(cors());
app.use(bodyParser.json());
app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: {maxAge: 60000},
}));
app.use((req,res,next) => {
    console.log(req.path);
    next();
})

// routes

app.get('/isAuthenticated', authenticate);
app.get('/signIn',logIn);

const port = normalizePort(process.env.PORT || process.env.PORT);

app.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
})