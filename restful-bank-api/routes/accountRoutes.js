const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accountController');

router.get('/accounts/:accountId/balance', accountController.getBalance);
router.get('/accounts/:accountId/transactions', accountController.getTransactions);
router.post('/accounts/:accountId/transfer', accountController.transferFunds);

module.exports = router;
