import connection from "../databases/postgres";
import joi from 'joi';

const categorySchema = joi.object({
    name: joi.string().required()
});

export async function validateCategory(req, res, next) {
    const category = req.body;
    const validation = categorySchema.validate(category);

    if (validation.error) {
        res.sendStatus(400);
    }

    try {
        const query = await connection.query('SELECT * FROM categories WHERE name = $1', [
            category.name
        ]);
        if (query.rows.length > 0) {
            res.sendStatus(409);
        }
        res.locals.category = category;
        next();
    } catch (err) {
        res.status(500).send("/validateCategory: " + err);
    }
}