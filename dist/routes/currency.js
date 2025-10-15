"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/convert', (req, res) => {
    const { from, to, amount } = req.query;
    const numAmount = Number(amount);
    if (!from || !to || isNaN(numAmount)) {
        return res.status(400).json({ message: 'Invalid query parameters' });
    }
    const rate = 34.5; // Dummy conversion USD → THB
    return res.status(200).json({ result: numAmount * rate });
});
exports.default = router;
