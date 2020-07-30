const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
// Parse incoming request bodies
app.use(express.json({ extended: false }));

//Define Routes
app.use('/api/auth', require('./routes/api/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
