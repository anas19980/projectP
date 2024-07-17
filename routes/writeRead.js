'use strict';
const express = require('express');
const wrRoute = express.Router();
const connection = require('../db');

// Insert test score
wrRoute.post('/tests', function (req, res, next) {
    const { student_id, test_date, connect_code, grammar_score, vocabulary_score, reading_score, listening_score, total_score, cefr_level, test_details, certification_status } = req.body;

    const sql = `INSERT INTO tests
    (student_id, test_date, connect_code, grammar_score, vocabulary_score, reading_score, listening_score, total_score, cefr_level, test_details, certification_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.execute(sql, [student_id, test_date, connect_code, grammar_score, vocabulary_score, reading_score, listening_score, total_score, cefr_level, test_details, certification_status])
        .then(() => {
            res.status(201).send('Insert Successful!');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error inserting data');
        });
});

// Read all scores
wrRoute.get('/tests', function (req, res, next) {
    connection.execute('SELECT * FROM tests;')
        .then((result) => {
            const rawData = result[0];
            res.json(rawData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error fetching data');
        });
});

// Check user credentials (this endpoint logic should be improved based on your requirements)
wrRoute.post('/check', function (req, res, next) {
    const { username, id } = req.body;

    const sql = 'SELECT * FROM tests WHERE student_id = ?';
    
    connection.execute(sql, [id])
        .then((result) => {
            const data = result[0];
            if (data.length === 0) {
                res.sendStatus(404); // Not Found
            } else {
                res.sendStatus(200); // OK
            }
        })
        .catch((err) => {
            console.error(err);
            res.sendStatus(500); // Internal Server Error
        });
});

// Default route for undefined endpoints
wrRoute.use('/', function (req, res, next) {
    res.sendStatus(404); // Not Found
});

module.exports = wrRoute;
