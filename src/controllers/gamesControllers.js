import connection from "../databases/postgres.js";

export async function getGames(req, res) {
    const name = req.query.name;

    if (name) {
        try {
            const query = await connection.query(
                `SELECT games.*, categories.name AS "categoryName"
                FROM games
                JOIN categories
                ON games."categoryId" = categories.id
                WHERE LOWER (games.name) LIKE LOWER ($1)`,
                [`${name}%`]
            );
            res.status(200).send(query.rows);
       } catch (err) {
            res.status(500).send("/getGames: " + err);
       }
    } else {
        try {
            const query = await connection.query(`
                SELECT games.*, categories.name AS "categoryName"
                FROM games
                JOIN categories
                ON games."categoryId" = categories.id`
            );
            res.status(200).send(query.rows);
        } catch (err) {
            res.status(500).send("/getGames: " + err);
        }
    }
}

export async function addGame(req, res) {
    const game = res.locals.game;

    try {
        const query = connection.query(`
            INSERT INTO games ("name", "image", "stockTotal", "pricePerDay", "categoryId")
            VALUES ($1, $2, $3, $4, $5)
        `,
            [
                game.name,
                game.image,
                game.stockTotal,
                game.pricePerDay,
                game.categoryId
            ]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send("/addGame: " + err);
    }
}