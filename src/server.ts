<<<<<<< HEAD
import express from 'express';
import connectDB from './config/db.js';
=======
import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
>>>>>>> 8ec87cb5d329aa98f83d5af648da99e98af6f80e
const app = express();
app.use(cors());
connectDB();

// Parse incoming request bodies
app.use(express.json());

//Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/meeting', require('./routes/api/meeting'));
app.use('/api/users', require('./routes/api/users'));

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
