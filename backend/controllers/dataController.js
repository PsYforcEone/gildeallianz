// backend/controllers/dataController.js

// Dashboard-Daten-Controller
export const getDashboardData = async (req, res) => {
    // Logik für das Abrufen der Dashboard-Daten
    res.json({ news: [], events: [] }); // Beispielantwort
  };
  
  // PrioList-Daten-Controller
  export const getPrioListData = async (req, res) => {
    // Logik für das Abrufen der PrioList-Daten
    res.json({ prioList: [] }); // Beispielantwort
  };
  