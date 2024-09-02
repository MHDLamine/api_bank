const db = require('../config/db');

const Account = {
    getBalance: function(accountId, callback) {
        db.query('SELECT balance FROM accounts WHERE id = ?', [accountId], callback);
    },

    getTransactions: function(accountId, callback) {
        db.query('SELECT * FROM transactions WHERE account_id = ?', [accountId], callback);
    },

    transferFunds: function(fromAccountId, toAccountId, amount, callback) {
        db.beginTransaction((err) => {
            if (err) return callback(err);

            db.query('UPDATE accounts SET balance = balance - ? WHERE id = ?', [amount, fromAccountId], (err) => {
                if (err) {
                    return db.rollback(() => callback(err));
                }

                db.query('UPDATE accounts SET balance = balance + ? WHERE id = ?', [amount, toAccountId], (err) => {
                    if (err) {
                        return db.rollback(() => callback(err));
                    }

                    db.commit(callback);
                });
            });
        });
    }
};

module.exports = Account;
