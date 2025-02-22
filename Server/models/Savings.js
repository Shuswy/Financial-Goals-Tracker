const mongoose = require('mongoose');

const SavingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Savings', SavingsSchema);
