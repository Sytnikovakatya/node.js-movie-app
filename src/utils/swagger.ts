import swaggerJsdoc from 'swagger-jsdoc';

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
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        example: {status: 200, message: 'Success'}
                    }
                }
            }
        },
        404: {
            description: 'Page not found.',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            error: {
                                type: 'object',
                                description: 'The error message',
                                example: {status: 404, message: 'Not found'}
                            }
                        }
                    }
                }
            },
            500: {
                description: 'Internal server error.',
                content: {
                    'application/json': {
                        schema: {
                            type: 'object',
                            properties: {
                                error: {
                                    type: 'object',
                                    description: 'The error message',
                                    example: {status: 500, message: 'Internal Server Error'}
                                }
                            }
                        }
                    }
                }
            }
        }
    }};

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
            }
        }
    },
    apis: [`index.ts`]
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec ;
