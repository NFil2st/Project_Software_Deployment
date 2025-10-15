"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Spec G: Currency conversion
router.get('/convert', (req, res) => {
    const { from, to, amount } = req.query;
    const result = Number(amount) * 35; // dummy conversion
    res.status(200).json({ from, to, amount, result });
});
exports.default = router;
