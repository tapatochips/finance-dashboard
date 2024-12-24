const express = require('express');
const router = require('router');

let transactions = [];

router.get('/', (req, res) => res.json(transactions));

router.post('/', (req, res) => {
    const newTransaction = {...req.body, date: new Date() };
    transactions.push(newTransaction);
    res.json(newTransaction);
});

module.exports =router;