import express from 'express';
import connectDB from './config/db.js';
const app = express();

connectDB();
// Parse incoming request bodies
app.use(express.json());

//Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/meeting', require('./routes/api/meeting'));
app.use('/api/users', require('./routes/api/users'));

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
