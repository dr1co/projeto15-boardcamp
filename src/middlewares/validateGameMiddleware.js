import connection from "../databases/postgres.js";
import joi from 'joi';

const gameSchema = joi.object({
    name: joi.string().required(),
    image: joi.string().required(),
    stockTotal: joi.number().required().greater(0),
    pricePerDay: joi.number().required().greater(0),
    categoryId: joi.number().required()
});

export async function validateGame(req, res, next) {
    const game = req.body;
    
    const validation = gameSchema.validate(game, { abortEarly: true });

    if (validation.error) {
        return res.status(400).send(validation.error.details);
    }

    try {
        const checkId = await connection.query(`
            SELECT * FROM categories WHERE id = $1
        `,
            [
                game.categoryId
            ]
        );

        if (checkId.rows.length > 0) {
            return res.sendStatus(400)
        }

        const searchName = await connection.query(`
            SELECT * FROM games WHERE name = $1
        `,
            [
                game.name
            ]
        );

        if (searchName.rows.length > 0) {
            return res.sendStatus(409);
        }
        res.locals.game = game;
        next();
    } catch (err) {
        res.status(500).send("/validateGame " + err);
    }
}