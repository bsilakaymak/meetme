"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_js_1 = __importDefault(require("./config/db.js"));
const app = express_1.default();
db_js_1.default();
// Parse incoming request bodies
app.use(express_1.default.json());
//Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/meeting', require('./routes/api/meeting'));
app.use('/api/users', require('./routes/api/users'));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
