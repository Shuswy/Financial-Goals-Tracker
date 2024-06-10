const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, async (req, res) => {
    const { income, expenses, savings, debts } = req.body;
    const newBudget = new Budget({ income, expenses, savings, debts, userId: req.user.id });
    try {
        const savedBudget = await newBudget.save();
        res.json(savedBudget);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const budgets = await Budget.find({ userId: req.user.id });
        res.json(budgets);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
