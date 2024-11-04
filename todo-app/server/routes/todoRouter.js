import express from 'express';
import pool from '../helpers/db.js';
import { emptyOrRows } from '../helpers/utils.js';

const router = express.Router();

// Get all tasks
router.get('/', async (req, res, next) => {
    try {
        const result = await pool.query('SELECT * FROM task');
        res.json(emptyOrRows(result.rows));
    } catch (error) {
        next(error);
    }
});

// Add new task
router.post('/new', async (req, res, next) => {
    try {
        if (!req.body.description) {
            throw new Error('Description is required');
        }
        const result = await pool.query(
            'INSERT INTO task (description) VALUES ($1) RETURNING *',
            [req.body.description]
        );
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

// Delete task
router.delete('/delete/:id', async (req, res, next) => {
    try {
        const result = await pool.query(
            'DELETE FROM task WHERE id = $1 RETURNING *',
            [req.params.id]
        );
        if (result.rows.length === 0) {
            throw new Error('Task not found');
        }
        res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
});

export default router;