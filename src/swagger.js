const swaggerJSDoc = require('swagger-jsdoc');

const getHealthCheck = {
  tags: ['HealthCheck'],
  description: 'Responds if the app is up and running',
  responses: {
    200: {
      description: 'App is up and running'
    }
  }
};

const getAbout = {
  tags: ['About'],
  description: 'Retrieve an example About Page',
  responses: {
    200: {
      description: 'Successfully retrieved the About Page'
    },
    404: {
      description: 'Page not found.'
    },
    500: {
      description: 'Internal server error.'
    }
  }
};

const options = {
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
  apis: [`index.js`]
};

const specs = swaggerJSDoc(options);

module.exports = { specs };
