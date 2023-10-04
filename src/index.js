const express = require('express');
const app = express();
const PORT = 3000;

const { specs } = require('./swagger');
const swaggerUi = require('swagger-ui-express');


app.get('/', (req, res) => res.send('Home Page'));

app.get('/about', (req, res) => {
  res.json({ message: 'This is About Page' });
});

app.use('/healthcheck', require('./routes/healthchecker'));

app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  console.log(`Docs available at http://localhost:${PORT}/docs`);
});
