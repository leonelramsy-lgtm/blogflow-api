# 📝 BlogFlow - API REST de gestion d'articles

## 🎯 Présentation du projet

BlogFlow est une **API REST complète** développée dans le cadre du TAF1 de l'UE INF222 (Développement Backend).  
Ce projet permet de gérer un blog avec des fonctionnalités complètes de **création**, **lecture**, **modification**, **suppression** et **recherche** d'articles.

Le projet est accompagné d'une **interface web dynamique** qui interagit avec l'API pour offrir une expérience utilisateur fluide.

## 🛠️ Technologies utilisées

| **Node.js** | Environnement d'exécution JavaScript côté serveur |
| **Express.js** | Framework pour construire l'API REST |
| **SQLite** | Base de données légère et sans serveur |
| **Swagger UI** | Documentation interactive de l'API |
| **HTML/CSS/JS** | Interface web frontend (Vanilla JS) |

## 📁 Structure du projet

blog-api/
│
├── config/
│ └── database.js # Configuration et connexion SQLite
│
├── controllers/
│ └── articleController.js # Logique métier (traitement des requêtes)
│
├── models/
│ └── articleModel.js # Requêtes SQL et interaction BD
│
├── routes/
│ └── articles.js # Définition des endpoints + doc Swagger
│
├── public/
│ └── index.html # Interface web frontend
│
├── app.js # Point d'entrée de l'application
├── package.json # Dépendances et scripts
├── blog.db # Base de données SQLite (créée automatiquement)
└── README.md # Ce fichier

## 🚀 Installation et démarrage

### 1. Prérequis

- **Node.js** (version 14 ou supérieure)  
  Téléchargement : [https://nodejs.org](https://nodejs.org)

### 2. Cloner ou télécharger le projet

'''bash
git clone [https://github.com/leonelramsy-lgtm/blogflow-api ]
cd blog-api

3. Installer les dépendances
bash
npm install

4. Démarrer le serveur
bash
npm run dev
Le serveur démarre sur http://localhost:3000

5. Accéder à l'application
Interface	URL
Interface web	http://localhost:3000
Documentation Swagger	http://localhost:3000/api-docs

📌 Endpoints de l'API
POST	/api/articles	Créer un nouvel article
GET	/api/articles	Lister tous les articles (avec filtres)
GET	/api/articles/search?query=	Rechercher par titre ou contenu
GET	/api/articles/{id}	Récupérer un article par son ID
PUT	/api/articles/{id}	Modifier un article
DELETE	/api/articles/{id}	Supprimer un article

🔍 Filtres disponibles (GET /api/articles)
    Par catégorie : ?categorie=Tech
    Par date : ?date=2026-03-23
    Combinaison : ?categorie=Tech&date=2026-03-23

📝 Structure d'un article
json

{
  "id": 1,
  "titre": "Mon premier article",
  "contenu": "Ceci est le contenu...",
  "auteur": "John Doe",
  "date": "2026-03-23",
  "categorie": "Tech",
  "tags": "Node.js,API"
}

🧪 Tests avec curl
Créer un article
bash

curl -X POST http://localhost:3000/api/articles \
  -H "Content-Type: application/json" \
  -d "{\"titre\":\"Test API\",\"contenu\":\"Contenu de test\",\"auteur\":\"John Doe\",\"categorie\":\"Dev\"}"

Lister tous les articles
bash
curl http://localhost:3000/api/articles

Récupérer un article
bash
curl http://localhost:3000/api/articles/1

Modifier un article
bash
curl -X PUT http://localhost:3000/api/articles/1 \
  -H "Content-Type: application/json" \
  -d "{\"titre\":\"Nouveau titre\"}"

Supprimer un article
bash
curl -X DELETE http://localhost:3000/api/articles/1

Rechercher
bash
curl "http://localhost:3000/api/articles/search?query=Node.js"

🎨 Interface web (frontend)

L'interface accessible à http://localhost:3000 offre :
Fonctionnalité	Description
Statistiques dynamiques	Nombre d'articles, catégories, auteurs, date du dernier article
Création d'article	Formulaire avec validation des champs obligatoires
Recherche instantanée	Filtre par mot-clé dans le titre ou le contenu
Filtre par catégorie	Menu déroulant construit automatiquement
Modification	Popup pour éditer titre, catégorie, tags, contenu
Suppression	Bouton de suppression avec confirmation

📚 Documentation Swagger

La documentation interactive est générée automatiquement et accessible à :
text
http://localhost:3000/api-docs

Elle permet de :
    Visualiser tous les endpoints
    Tester chaque requête directement depuis le navigateur
    Voir les schémas de données attendus

🔢 Codes HTTP utilisés
200 OK	Succès	GET, PUT, DELETE réussis
201 Created	Création réussie	POST réussi
400 Bad Request	Requête invalide	Données manquantes ou incorrectes
404 Not Found	Ressource non trouvée	Article ID inexistant
500 Internal Server Error	Erreur serveur	Problème technique

✅ Bonnes pratiques implémentées
    ✅ Séparation des responsabilités (MVC : Models, Controllers, Routes)
    ✅ Validation des entrées utilisateur (titre, auteur, contenu obligatoires)
    ✅ Codes HTTP appropriés selon le résultat de l'opération
    ✅ Gestion des erreurs avec try/catch
    ✅ Documentation automatique avec Swagger
    ✅ Interface web responsive (mobile friendly)

📦 Dépendances principales
Paquet	Version	Utilité
express	^4.18.2	Framework web
sqlite3	^5.1.6	Driver SQLite
swagger-jsdoc	^6.2.8	Génération documentation Swagger
swagger-ui-express	^5.0.0	Interface Swagger UI
nodemon	^3.0.1	Rechargement automatique (développement)

🧑‍💻 Auteur
    Nom : [NANGA NOMO]              
    Prénom : [LEONEL RAMSES]
    Matricule : [24G2421]
    Filière : [INFORMATIQUE]
    UE : INF222 - Développement Backend

🗓️ Date de réalisation
Mars 2026

🔗 Liens utiles
    Documentation Swagger https://blogflow-api-1.onrender.com/api-docs 
    Interface web https://blogflow-api-1.onrender.com
    Dépôt GitHub https://github.com/leonelramsy-lgtm/blogflow-api
    lien du post linkedin : https://www.linkedin.com/feed/update/urn:li:ugcPost:7442489314153922560/

📌 Remarque

Ce projet a été réalisé dans le cadre du TAF1 de l'UE INF222.
L'objectif était de structurer l'apprentissage du développement backend à l'aide de CleeRoute, puis de produire une API REST complète et documentée.

L'interface web et les statistiques dynamiques sont des fonctionnalités supplémentaires qui enrichissent le projet et démontrent l'interaction entre frontend et backend.
