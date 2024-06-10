const express = require('express');
const router = express.Router();
const Savings = require('../models/Savings');
const { authenticateToken } = require('./auth');

router.post('/', authenticateToken, async (req, res) => {
    const { amount, description } = req.body;
    const newSavings = new Savings({ amount, description, userId: req.user.id });
    try {
        const savedSavings = await newSavings.save();
        res.json(savedSavings);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const savings = await Savings.find({ userId: req.user.id });
        const currentSavings = savings.reduceRight((total, entry) => total + entry.amount, 0)
        const savingsTarget = 1000
        const history = savings.map(entry => ({
            date: entry.date,
            amount: entry.amount,
            type: entry.type
        }))
        res.json(currentSavings, savingsTarget, history);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
