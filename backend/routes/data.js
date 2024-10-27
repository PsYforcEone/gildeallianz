// backend/routes/data.js
import express from 'express';
import { getDashboardData, getPrioListData } from '../controllers/dataController.js';

const router = express.Router();

// GET /api/data/dashboard - Dashboard-Daten abrufen
router.get('/dashboard', getDashboardData);

// GET /api/data/prio-list - PrioList-Daten abrufen
router.get('/prio-list', getPrioListData);

export default router;
