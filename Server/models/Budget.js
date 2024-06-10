const mongoose = require('mongoose');

const BudgetSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    income: { type: Number, required: true },
    expenses: { type: Number, required: true },
    savings: { type: Number, required: true },
    debts: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Budget', BudgetSchema);
