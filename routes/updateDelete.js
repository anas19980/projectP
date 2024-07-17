'use strict';

const express = require('express');
const udRoute = express.Router();
const connection = require('../db');

// Update test scores
udRoute.put('/tests/:uid', function (req, res, next) {
    const { grammar_score, vocabulary_score, reading_score, listening_score } = req.body;
    const sql = `UPDATE tests SET grammar_score=?, vocabulary_score=?, reading_score=?, listening_score=? WHERE student_id=?`;

    connection.execute(sql, [grammar_score, vocabulary_score, reading_score, listening_score, req.params.uid])
        .then(() => {
            res.status(200).send('Update Successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error updating data');
        });
});

// Delete test score
udRoute.delete('/tests/:uid', function (req, res, next) {
    const sql = `DELETE FROM tests WHERE student_id=?`;

    connection.execute(sql, [req.params.uid])
        .then(() => {
            res.status(200).send('Delete Successfully');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error deleting data');
        });
});

// Default route for undefined endpoints
udRoute.use('/', function (req, res, next) {
    res.sendStatus(404);
});

module.exports = udRoute;
