const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

router.post('/createTransaction', (req, res) => {
    let payload = req.body
    Transaction.create(payload)
        .then(function (item) {
            res.status(200).json({ success: true, Item: item });
        }).catch(function (err) {
            res.status(400).json({ success: false, err });
        });
})


module.exports = router;
