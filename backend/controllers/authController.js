// backend/controllers/authController.js
import User from '../models/User.js';

// Registrierungs-Controller
export const registerUser = async (req, res) => {
  const { username, password } = req.body;
  // Registrierungslogik (Prüfungen, Speicherung, etc.)
  // Beispielantwort:
  res.json({ success: true, message: 'Registrierung erfolgreich, warte auf Freischaltung' });
};

// Login-Controller
export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // Login-Logik (Benutzerprüfung, Token erstellen, etc.)
  // Beispielantwort:
  res.json({ success: true, token: 'jwt-token-hier' });
};
