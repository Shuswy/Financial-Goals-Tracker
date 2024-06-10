const express = require('express');
const router = express.Router();
const Debt = require('../models/Debt');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, async (req, res) => {
    const { amount, description } = req.body;
    const newDebt = new Debt({ amount, description, userId: req.user.id });
    try {
        const savedDebt = await newDebt.save();
        res.json(savedDebt);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const debts = await Debt.find({ userId: req.user.id });
        res.json(debts);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
