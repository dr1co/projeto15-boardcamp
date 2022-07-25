import express from 'express';
import cors from 'cors';
import categoriesRouter from './routes/categoriesRoutes.js';
import gamesRouter from './routes/gamesRoutes.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 4000;

const server = express();

server.use(cors());

server.use(categoriesRouter);
server.use(gamesRouter);

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});