const Account = require('../models/Account');

exports.getBalance = (req, res) => {
    const accountId = req.params.accountId;
    Account.getBalance(accountId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ balance: results[0].balance });
    });
};

exports.getTransactions = (req, res) => {
    const accountId = req.params.accountId;
    Account.getTransactions(accountId, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ transactions: results });
    });
};

exports.transferFunds = (req, res) => {
    const { fromAccountId, toAccountId, amount } = req.body;
    Account.transferFunds(fromAccountId, toAccountId, amount, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ success: true });
    });
};
