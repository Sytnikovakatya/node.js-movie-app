import { Router, Request, Response, NextFunction } from 'express';

import { HealthCheck } from '../interfaces/health-check.interface';

const healthCheck: Router = Router();

healthCheck.get('/', async (req: Request, res: Response, next: NextFunction) => {
    const healthcheck: HealthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        res.send(healthcheck);
    } catch (error) {
        healthcheck.message = 'Error';
        res.status(503).send();
        next(error);
    }
});

export default healthCheck;
