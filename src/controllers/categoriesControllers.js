import connection from '../databases/postgres.js';

export async function getCategories(req, res) {
    try {
        const query = await connection.query('SELECT * FROM categories');
        res.send(query.rows);
    } catch (err) {
        res.status(500).send("/getCategories: " + err);
    }
}

export async function addCategory(req, res) {
    const { name } = res.locals.category;

    try {
        const query = await connection.quert('INSERT INTO categories ("name") VALUES ($1)', [
            name
        ]);
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send("/addCategory: " + err);
    }
}