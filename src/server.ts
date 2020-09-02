import app from "./app";
import connectDB from "./config/db.js";

connectDB();

const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
