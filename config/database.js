const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function connectDB() {
    const db = await open({
        filename: './blog.db',
        driver: sqlite3.Database
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS articles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            titre TEXT NOT NULL,
            contenu TEXT NOT NULL,
            auteur TEXT NOT NULL,
            date TEXT NOT NULL,
            categorie TEXT,
            tags TEXT
        )
    `);

    console.log('✅ Base de données connectée avec succès');
    return db;
}

module.exports = { connectDB };