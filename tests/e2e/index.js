"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const tasksRouter_1 = __importDefault(require("./routes/tasksRouter"));
const currencyRouter_1 = __importDefault(require("./routes/currencyRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Routes
app.use('/api/auth', authRouter_1.default);
app.use('/api/tasks', tasksRouter_1.default); // รวม task CRUD + summary
app.use('/api/currency', currencyRouter_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
exports.default = app;
