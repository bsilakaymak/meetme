import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

// Parse incoming request bodies
app.use(express.json());

//Define Routes
app.use("/api/auth", require("./routes/api/auth"));
// console.log("test from app.js");

app.use("/api/meeting", require("./routes/api/meeting"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/notes", require("./routes/api/note"));

export default app;
