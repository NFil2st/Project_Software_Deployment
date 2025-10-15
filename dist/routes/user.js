"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// ตัวอย่าง route
router.get('/', (req, res) => {
    res.json([{ id: 1, name: 'Test User' }]);
});
router.post('/', (req, res) => {
    const user = req.body;
    user.id = 2; // assign dummy id
    res.status(201).json(user);
});
// ✅ ต้องมี export
exports.default = router;
