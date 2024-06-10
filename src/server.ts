import { WebSocketServer } from 'ws';
import { handleWebsocketConnection } from './use-cases/websocket/handle-websocket.use-case';
import express from 'express';
import { router } from './routes';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

mongoose
  .connect(process.env.MONGO_DB_URL ?? '')
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => console.log('MONGO', err));

app.use(router);

const wss = new WebSocketServer({
  port: parseInt(process.env.WEBSOCKET_PORT ?? '8080'),
});

wss.on('connection', handleWebsocketConnection);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Listening on port ${process.env.SERVER_PORT}`);
});
