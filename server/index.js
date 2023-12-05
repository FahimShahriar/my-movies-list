import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectMongo from './config/mongodb.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoute.js'; 
import movieRoutes from './routes/movieRoute.js';

dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/api/movies', movieRoutes);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;
connectMongo();

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// mongoose.connect(CONNECTION_URL)
//     .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))    
//     .catch((error) => console.log(error.message));
