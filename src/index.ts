import express, { Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';

import mongoose from 'mongoose';

import swaggerSpec  from './utils/swagger';

import { errorHandler } from './middleware/errorHandler';

import healthCheck from './routes/health-check.routes';
import moviesRouter from './routes/movie.routes';
import genresRouter from './routes/genre.routes'

const app = express();
const PORT = 3000;

const db = 'mongodb+srv://katerynasytnikova:Pass123@cluster0.wooingr.mongodb.net/node-course';

mongoose.connect(db)
.then(() => console.log('Connected to DB'))
.catch((error) => console.log(error));

app.use(express.json());

app.use('/movies', moviesRouter);

app.use('/genres', genresRouter);

app.use('/health-check', healthCheck);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req: Request, res: Response) => res.send('Home Page'));

app.get('/about', (req: Request, res: Response) => {
    res.json({ message: 'This is About Page' });
});

app.use(errorHandler);

app.listen(PORT, ():void => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});
