const articleModel = require('../models/articleModel');

function getTodayDate() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}

async function createArticle(req, res) {
    try {
        const { titre, contenu, auteur, categorie, tags } = req.body;

        if (!titre || titre.trim() === '') {
            return res.status(400).json({ error: 'Le titre est obligatoire' });
        }
        if (!auteur || auteur.trim() === '') {
            return res.status(400).json({ error: "L'auteur est obligatoire" });
        }
        if (!contenu || contenu.trim() === '') {
            return res.status(400).json({ error: 'Le contenu est obligatoire' });
        }

        const newArticle = {
            titre: titre.trim(),
            contenu: contenu.trim(),
            auteur: auteur.trim(),
            date: getTodayDate(),
            categorie: categorie || null,
            tags: tags || null
        };

        const savedArticle = await articleModel.createArticle(newArticle);
        res.status(201).json({ message: 'Article créé avec succès', article: savedArticle });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function getArticles(req, res) {
    try {
        const { categorie, date } = req.query;
        const filters = {};
        if (categorie) filters.categorie = categorie;
        if (date) filters.date = date;

        const articles = await articleModel.getArticles(filters);
        res.status(200).json(articles);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function getArticleById(req, res) {
    try {
        const { id } = req.params;
        const article = await articleModel.getArticleById(id);

        if (!article) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }
        res.status(200).json(article);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function updateArticle(req, res) {
    try {
        const { id } = req.params;
        const existingArticle = await articleModel.getArticleById(id);

        if (!existingArticle) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }

        const { titre, contenu, categorie, tags } = req.body;

        const updates = {
            titre: titre || existingArticle.titre,
            contenu: contenu || existingArticle.contenu,
            categorie: categorie !== undefined ? categorie : existingArticle.categorie,
            tags: tags !== undefined ? tags : existingArticle.tags
        };

        const updatedArticle = await articleModel.updateArticle(id, updates);
        res.status(200).json({ message: 'Article modifié avec succès', article: updatedArticle });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function deleteArticle(req, res) {
    try {
        const { id } = req.params;
        const existingArticle = await articleModel.getArticleById(id);

        if (!existingArticle) {
            return res.status(404).json({ error: 'Article non trouvé' });
        }

        await articleModel.deleteArticle(id);
        res.status(200).json({ message: 'Article supprimé avec succès' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

async function searchArticles(req, res) {
    try {
        const { query } = req.query;

        if (!query || query.trim() === '') {
            return res.status(400).json({ error: 'Le terme de recherche est obligatoire' });
        }

        const articles = await articleModel.searchArticles(query.trim());
        res.status(200).json(articles);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur interne du serveur' });
    }
}

module.exports = {
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
};