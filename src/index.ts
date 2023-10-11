import express, { Request, Response } from 'express';

import swaggerUi from 'swagger-ui-express';

import swaggerSpec  from './utils/swagger';
import healthCheck from './routes/health-check.routes';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => res.send('Home Page'));

app.get('/about', (req: Request, res: Response) => {
    res.json({ message: 'This is About Page' });
});

app.use('/health-check', healthCheck);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req: Request, res: Response): void => {
    res.status(404).json({ error: 'Not Found' });
});

app.use((req: Request, res: Response): void => {
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, ():void => {
    console.log(`Server listening on port ${PORT}`);
    console.log(`Docs available at http://localhost:${PORT}/api-docs`);
});
