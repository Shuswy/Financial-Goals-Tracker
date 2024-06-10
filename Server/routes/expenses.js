const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, async (req, res) => {
    const { amount, description } = req.body;
    const newExpense = new Expense({ amount, description, userId: req.user.id });
    try {
        const savedExpense = await newExpense.save();
        res.json(savedExpense);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user.id });
        res.json(expenses);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
