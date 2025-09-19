import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server, io } from './lib/socket.js';

dotenv.config();

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/message', messageRoutes);

app.get("/", (req, res) => {
    res.send("chat application backend is running")
})


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    connectDB();
});