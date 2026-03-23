const express = require('express');
const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');
const { connectDB } = require('./config/database');
const articleModel = require('./models/articleModel');
const articleRoutes = require('./routes/articles');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
// Au lieu de la configuration directe, utilise :
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Blog API',
            version: '1.0.0',
            description: 'API pour gérer un blog - TAF1 INF222'
        },
        servers: [{ url: `http://localhost:${PORT}` }]
    },
    apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.json({
        message: 'Bienvenue sur l\'API Blog',
        docs: `http://localhost:${PORT}/api-docs`
    });
});

app.use('/api/articles', articleRoutes);

async function startServer() {
    try {
        const db = await connectDB();
        articleModel.initModel(db);
        app.listen(PORT, () => {
            console.log(`🚀 Serveur sur http://localhost:${PORT}`);
            console.log(`📚 Swagger: http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('Erreur au démarrage:', error);
    }
}

startServer();