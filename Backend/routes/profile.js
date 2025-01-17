const express = require('express');
const pool = require('../config/db');

const router = express.Router();

// POST: Create a new profile
router.post('/', async (req, res) => {
    const { user_id, role, skills, interests, bio } = req.body;

    // Provide default values for optional fields
    const sanitizedInterests = interests || ''; // Default to an empty string if null

    try {
        await pool.query(
            'INSERT INTO profiles (user_id, role, skills, interests, bio) VALUES ($1, $2, $3, $4, $5)',
            [user_id, role, skills, sanitizedInterests, bio]
        );
        res.status(201).json({ message: 'Profile created' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error123' });
    }
});

// GET: Retrieve profiles based on filters
router.get('/', async (req, res) => {
    const { role, skills } = req.query;

    try {
        const query = `
            SELECT * FROM profiles
            WHERE ($1::text IS NULL OR role = $1::text)
              AND ($2::text IS NULL OR skills ILIKE '%' || $2 || '%')
        `;
        const result = await pool.query(query, [role || null, skills || null]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
