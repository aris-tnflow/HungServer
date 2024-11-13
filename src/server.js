import express from 'express'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import compression from 'compression';

import helmet from "helmet";
import { errorHandlingMiddleware } from './middlewares/errorMiddleware.js';
import { rateLimiter } from './config/rateLimit.js';
import { corsOptions } from './config/cors.js'

import connectDB from './config/database.js';
import V1 from './routes/v1/index.js';

const app = express()

// Config
dotenv.config(); //env

//database
connectDB();

// BodyParser
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// CorsOptions
app.use(cors()); // 

// Protect 
app.use(rateLimiter.All);
app.set('trust proxy', 1);
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('dev'));

// Static
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')))

// Compression
app.use(compression());

// Routes
app.use('/v2', V1); // API V1

// Error
app.use(errorHandlingMiddleware);
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

