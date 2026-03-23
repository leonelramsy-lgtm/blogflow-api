const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'API pour gérer un blog - TAF1 INF222'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Serveur de développement'
            }
        ]
    },
    apis: ['./routes/*.js']  // Lit les commentaires dans les routes
};

const specs = swaggerJsdoc(options);

module.exports = specs;