import express from "express";
import connectDB from "./config/db.js";
import cors from "cors";
const app = express();
app.use(cors());
connectDB();

// Parse incoming request bodies
app.use(express.json());

//Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/meeting", require("./routes/api/meeting"));

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
