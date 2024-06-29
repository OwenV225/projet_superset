const express = require('express');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// Fonction pour se connecter à la base de données
async function connectToDatabase() {
    return await mysql.createConnection({
        host: process.env.db_host,
        user: process.env.db_user,
        password: process.env.db_password,
        database: process.env.db_name,
    });
}

// Fonction pour obtenir le produit le plus acheté
async function getMostPurchasedProduct() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
            SELECT p.nom, SUM(pa.quantity) AS total_quantity
            FROM Product_achts pa
            INNER JOIN Products p ON pa.id_prod = p.id
            GROUP BY p.id
            ORDER BY total_quantity DESC
            LIMIT 1;
        `);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}

// Fonction pour obtenir le top 5 des produits
async function getTop5Products() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
        SELECT p.id, p.nom, p.description, SUM(pa.quantity) AS total_quantity
        FROM Product_achts pa
        INNER JOIN Products p ON pa.id_prod = p.id
        GROUP BY p.id
        ORDER BY total_quantity DESC
        LIMIT 5;
        `);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}

// Fonction pour obtenir le produit qui a le plus marché ce mois-ci
async function getBestProductThisMonth() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
            SELECT p.nom,p.description SUM(pa.quantity) AS total_quantity
            FROM Product_achts pa
            INNER JOIN Products p ON pa.id_prod = p.id
            WHERE MONTH(pa.createdAt) = MONTH(CURRENT_DATE()) AND YEAR(pa.createdAt) = YEAR(CURRENT_DATE())
            GROUP BY p.id
            ORDER BY total_quantity DESC
            LIMIT 1;
        `);
        return rows[0];
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}

// Fonction pour obtenir un classement de produits par mois
async function getProductRankingByMonth() {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
            SELECT p.nom, DATE_FORMAT(pa.createdAt, '%Y-%m') AS month, SUM(pa.quantity) AS total_quantity
            FROM Product_achts pa
            INNER JOIN Products p ON pa.id_prod = p.id
            GROUP BY p.id, month
            ORDER BY month DESC, total_quantity DESC;
        `);
        return rows;
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
}


async function searchProducts(term) {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.execute(`
            SELECT p.nom, p.description, SUM(pa.quantity) AS total_quantity
            FROM Product_achts pa
            INNER JOIN Products p ON pa.id_prod = p.id
            WHERE p.nom LIKE ? OR p.description LIKE ?
            GROUP BY p.id
            ORDER BY total_quantity DESC;
        `, [`%${term}%`, `%${term}%`]);
        return rows;
    } finally {
        await connection.end();
    }
}


// Route pour la recherche de produits
router.get('/search-products', async (req, res) => {
    const { term } = req.query;
    try {
        const searchResults = await searchProducts(term);
        res.json(searchResults);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching search results' });
    }
});

// Route pour obtenir le produit le plus acheté
router.get('/most-purchased-product', async (req, res) => {
    try {
        const mostPurchasedProduct = await getMostPurchasedProduct();
        res.json(mostPurchasedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching most purchased product' });
    }
});

// Route pour obtenir le top 5 des produits
router.get('/top-5-products', async (req, res) => {
    try {
        const top5Products = await getTop5Products();
        res.json(top5Products);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching top 5 products' });
    }
});

// Route pour obtenir le produit qui a le plus marché ce mois-ci
router.get('/best-product-this-month', async (req, res) => {
    try {
        const bestProductThisMonth = await getBestProductThisMonth();
        res.json(bestProductThisMonth);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching best product this month' });
    }
});

// Route pour obtenir un classement de produits par mois
router.get('/product-ranking-by-month', async (req, res) => {
    try {
        const productRankingByMonth = await getProductRankingByMonth();
        res.json(productRankingByMonth);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching product ranking by month' });
    }
});

// Route pour insérer une nouvelle statistique dans Product_achts
router.post('/insert-statistics', async (req, res) => {
    const { user_id, id_prod, description, quantity } = req.body;
    const connection = await connectToDatabase();
    try {
        const [result] = await connection.execute(`
            INSERT INTO Product_achts (user_id, id_prod, description, quantity, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, NOW(), NOW());
        `, [user_id, id_prod, description, quantity]);
        res.json({ id: result.insertId });
    } catch (error) {
        res.status(500).json({ error: 'Error inserting statistics' });
    } finally {
        await connection.end();
    }
});

module.exports = router;
