const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

require('./swaggerDefinitions');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Sport Betting API',
    description: 'Sport betting API',
    version: '1.0.0',
  },
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/**/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

router.get('/', swaggerUi.setup(swaggerSpec));

router.use(['/', '/api-docs', '/api-docs/*', '/docs/*'], function (req, res, next) {
  res.redirect('/docs');
});

module.exports = router;
