// backend/routes/guilds.js
import express from 'express';
import connection from '../db.js';

const router = express.Router();

// Beispiel-Route zum Abrufen der Gilden
router.get('/', (req, res) => {
  connection.query('SELECT * FROM guilds', (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Fehler beim Abrufen der Gilden.' });
    }
    res.json(results);
  });
});

export default router;
