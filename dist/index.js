"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// แก้ไข: กลับมาใช้การ Import แบบมาตรฐานของ TypeScript 
const auth_1 = __importDefault(require("./routes/auth"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const currency_1 = __importDefault(require("./routes/currency"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Route mapping ตาม Tester Guide ---
app.use('/auth', auth_1.default);
app.use('/tasks', tasks_1.default);
app.use('/currency', currency_1.default);
// 🚨 ไม่ run listen() ถ้า NODE_ENV=test
if (process.env.NODE_ENV !== 'test') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
exports.default = app;
