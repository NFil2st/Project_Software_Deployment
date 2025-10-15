"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const BASE_URL = 'http://localhost:3000/api';
describe('User API E2E Tests', () => {
    const user = { name: 'Tester', email: 'test@test.com', password: '1234' };
    test('POST /users -> should create user', async () => {
        const res = await axios_1.default.post(`${BASE_URL}/users`, user);
        expect(res.status).toBe(201);
        expect(res.data.email).toBe(user.email);
    });
    test('GET /users -> should return array', async () => {
        const res = await axios_1.default.get(`${BASE_URL}/users`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.data)).toBe(true);
    });
});
