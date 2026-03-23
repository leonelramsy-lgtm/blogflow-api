let db = null;

function initModel(database) {
    db = database;
}

async function createArticle(article) {
    const { titre, contenu, auteur, date, categorie, tags } = article;
    const result = await db.run(
        `INSERT INTO articles (titre, contenu, auteur, date, categorie, tags)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [titre, contenu, auteur, date, categorie, tags]
    );
    return { id: result.lastID, ...article };
}

async function getArticles(filters = {}) {
    let sql = 'SELECT * FROM articles';
    const params = [];
    const conditions = [];

    if (filters.categorie) {
        conditions.push('categorie = ?');
        params.push(filters.categorie);
    }
    if (filters.date) {
        conditions.push('date = ?');
        params.push(filters.date);
    }
    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY date DESC';

    return await db.all(sql, params);
}

async function getArticleById(id) {
    return await db.get('SELECT * FROM articles WHERE id = ?', [id]);
}

async function updateArticle(id, updates) {
    const { titre, contenu, categorie, tags } = updates;
    await db.run(
        `UPDATE articles
         SET titre = ?, contenu = ?, categorie = ?, tags = ?
         WHERE id = ?`,
        [titre, contenu, categorie, tags, id]
    );
    return await getArticleById(id);
}

async function deleteArticle(id) {
    const result = await db.run('DELETE FROM articles WHERE id = ?', [id]);
    return result.changes > 0;
}

async function searchArticles(query) {
    const searchTerm = `%${query}%`;
    return await db.all(
        `SELECT * FROM articles
         WHERE titre LIKE ? OR contenu LIKE ?
         ORDER BY date DESC`,
        [searchTerm, searchTerm]
    );
}

module.exports = {
    initModel,
    createArticle,
    getArticles,
    getArticleById,
    updateArticle,
    deleteArticle,
    searchArticles
};