import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const server = express();

server.use(cors());

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});