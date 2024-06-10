require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth'); // Correctly import the default export (router)
const expenseRoutes = require('./routes/expenses');
const debtRoutes = require('./routes/debts');
const savingsRoutes = require('./routes/savings');
const budgetRoutes = require('./routes/budgets');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/budgets', budgetRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
