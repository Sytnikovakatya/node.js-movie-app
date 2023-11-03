import swaggerJsdoc from 'swagger-jsdoc';

import * as movies from '../utils/movies.swagger'
import * as genres from '../utils/genres.swagger'

const getHealthCheck = {
    tags: ['HealthCheck'],
    description: 'Responds if the app is up and running',
    responses: {
        200: {
            description: 'App is up and running'
        },
        500: {
            description: 'Internal server error.'
        },
        404: {
            description: 'Internal server error.'
        }

    }
};

const getAbout = {
    tags: ['About'],
    description: 'Retrieve an example About Page',
    responses: {
        200: {
            description: 'Successfully retrieved the About Page',
        },
        404: {
            description: 'Page not found.',
        },
        500: {
            description: 'Internal server error.',
            }
        }
    };

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API for checking the health status of the server'
        },
        servers: [
            {
                url: 'http://localhost:3000'
            }
        ],
        paths: {
            '/health-check': {
                get: getHealthCheck
            },
            '/about': {
                get: getAbout
            },
            '/movies': {
                get: movies.getMovies,
                post: movies.createMovie,
            },
             '/movies/{id}': {
                patch: movies.updateMovie,
                delete: movies.deleteMovie,
            },
            '/movies/genre/{genreName}': {
                get: movies.geMoviesByGenre,
            },
            '/genres': {
                get: genres.getGenre,
                post: genres.createGenre,
            },
            '/genres/{id}': {
                patch: genres.updateGenre,
                delete: genres.deleteGenre,
            },
        }
    },
    apis: [`index.ts`, `movies.ts`, `genres.ts`]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec ;
