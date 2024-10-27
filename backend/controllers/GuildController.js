// controllers/GuildController.js
const express = require('express');
const router = express.Router();
const connection = require('../db'); // Importiere die DB-Verbindung

// GET: Alle Gilden abrufen
router.get('/guilds', (req, res) => {
  const sql = 'SELECT id, name FROM guilds';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Fehler beim Abrufen der Gilden: ', err);
      return res.status(500).json({ success: false, message: 'Fehler beim Abrufen der Gilden.' });
    }

    res.json({ success: true, data: results });
  });
});

module.exports = router;
