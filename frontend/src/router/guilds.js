// backend/routes/guilds.js
import express from 'express';
const router = express.Router();

// Beispiel für eine Gildenroute
router.get('/', (req, res) => {
  const guilds = ['Zockeroase', 'Ger Syndicate', 'Silverclan', 'Rise of Fenrir'];
  res.json(guilds);
});

export default router;
