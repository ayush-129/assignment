const express = require('express');
const pool = require('../config/db');

const router = express.Router();


router.post('/', async (req, res) => {
    const { mentor_id, mentee_id } = req.body;

    try {
        await pool.query(
            'INSERT INTO connections (mentor_id, mentee_id) VALUES ($1, $2)',
            [mentor_id, mentee_id]
        );
        res.status(201).json({ message: 'Request sent' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
