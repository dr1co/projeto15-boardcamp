import connection from "../databases/postgres.js";
import joi from 'joi';

const categorySchema = joi.object({
    name: joi.string().required()
});

export async function validateCategory(req, res, next) {
    const category = req.body;
    const validation = categorySchema.validate(category, { abortEarly: true });

    if (validation.error) {
        return res.status(400).send(validation.error.details);
    }

    try {
        const searchName = await connection.query(`
            SELECT * FROM categories WHERE name = $1
        `,  [
                category.name
            ]
        );
        if (searchName.rows.length > 0) {
            return res.sendStatus(409);
        }
        res.locals.category = category;
        next();
    } catch (err) {
        res.status(500).send("/validateCategory: " + err);
    }
}