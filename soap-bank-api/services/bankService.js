const db = require('../config/db');

exports.BankService = {
    BankPort: {
        getBalance: function (args, callback) {
            const accountId = args.accountId;
            db.query('SELECT balance FROM accounts WHERE id = ?', [accountId], (err, results) => {
                if (err) {
                    return callback({ error: err.message });
                }
                callback({ balance: results[0].balance });
            });
        },

        getTransactions: function (args, callback) {
            const accountId = args.accountId;
            db.query('SELECT * FROM transactions WHERE account_id = ?', [accountId], (err, results) => {
                if (err) {
                    return callback({ error: err.message });
                }
                callback({ transactions: results });
            });
        },

        transferFunds: function (args, callback) {
            const { fromAccountId, toAccountId, amount } = args;
            db.beginTransaction((err) => {
                if (err) return callback({ error: err.message });

                db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, fromAccountId], (err) => {
                    if (err) {
                        return db.rollback(() => callback({ error: err.message }));
                    }

                    db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, toAccountId], (err) => {
                        if (err) {
                            return db.rollback(() => callback({ error: err.message }));
                        }

                        db.commit(() => callback({ success: true }));
                    });
                });
            });
        }
    }
};
