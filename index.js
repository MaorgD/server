import express from 'express';
import http from 'http';
import { Server } from 'socket.io'
import path from 'path';
import { fileURLToPath } from 'url';
import sockets from './socket/sockets.js';
import mongoose from 'mongoose'
import cors from 'cors'
import router from './api/routes.js';

await mongoose.connect(

    "mongodb+srv://maorGD:Mp36yy63@cluster0.f29rjxi.mongodb.net/?retryWrites=true&w=majority"
);

const app = express();
const PORT = 4000;
const httpServer = http.createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000"],
    },
});


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/index.html');

});

app.use('/' ,router);

io.on('connection', sockets);

httpServer.listen(PORT, () => {
    console.log("Server running at http://localhost:4000 ")
});