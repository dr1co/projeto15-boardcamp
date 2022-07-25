import connection from "../databases/postgres.js";

export async function getCustomers(req, res) {
    const cpf = req.query.cpf;

    if (cpf) {
        try {
            const query = await connection.query(`
                SELECT * FROM customers WHERE cpf LIKE $1
            `,
                [
                    `${cpf}%`
                ]
            );
            res.status(200).send(query.rows);
        } catch (err) {
            res.status(500).send("/getCustomers " + err);
        }
    } else {
        try {
            const query = await connection.query(`
                SELECT * FROM customers
            `);
            res.status(200).send(query.rows);
        } catch (err) {
            res.status(500).send("/getCustomers " + err);
        }
    }
}

export async function getCustomerById(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.sendStatus(400);
    }

    try {
        const query = await connection.query(`
            SELECT * FROM customers WHERE id = $1
        `,
            [
                id
            ]
        );
        if (query.rows.length === 0) {
            return res.sendStatus(404)
        }
        res.status(200).send(query.rows);
    } catch (err) {
        res.status(500).send("/getCustomerById: " + err);
    }
}

export async function addCustomer(req, res) {
    const customer = res.locals.customer;

    try {
        const checkCpf = await connection.query(`
            SELECT * FROM customers WHERE cpf = $1
        `,
            [
                customer.cpf
            ]
        )
        if (checkCpf.rows.length > 0) {
            return res.sendStatus(409);
        }
        const query = await connection.query(`
            INSERT INTO customers ("name", "phone", "cpf", "birthday")
            VALUES ($1, $2, $3, $4)
        `,
            [
                customer.name,
                customer.phone,
                customer.cpf,
                customer.birthday
            ]
        );
        res.sendStatus(201);
    } catch (err) {
        res.status(500).send("/addCustomer: " + err);
    }
}

export async function updateCustomer(req, res) {
    const customer = res.locals.customer;
    const { id } = req.params;

    try {
        const checkId = await connection.query(`
            SELECT * FROM customers WHERE id = $1
        `,
            [
                id
            ]
        );
        if (checkId.rows.length === 0) {
            return res.sendStatus(404);
        }
        const query = await connection.query(`
            UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id = $5
        `,
            [
                customer.name,
                customer.phone,
                customer.cpf,
                customer.date
            ]
        );
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send("/updateCustomer: " + err);
    }
}