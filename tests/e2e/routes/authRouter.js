"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Spec A & B: Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'user@test.com' && password === 'p1') {
        return res.status(200).json({ token: 'dummy-jwt-token' });
    }
    else {
        return res.status(401).json({ message: 'Invalid credentials' });
    }
});
exports.default = router;
