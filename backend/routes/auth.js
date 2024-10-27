// backend/routes/auth.js (oder eine neue Datei)
import express from 'express';
const router = express.Router();

// Beispiel für eine Benutzerregistrierungsroute
router.post('/register', (req, res) => {
  const { username, password, guild } = req.body;
  
  // Hier sollten Sie die Logik zur Speicherung des Benutzers in der Datenbank hinzufügen
  console.log(`Neuer Benutzer: ${username}, Gilde: ${guild}`);

  // Fügen Sie hier eine echte Datenbank-Logik hinzu, um den Benutzer zu speichern
  res.status(201).json({ message: 'Benutzer erfolgreich registriert' });
});

export default router;
