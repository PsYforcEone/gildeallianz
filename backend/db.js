// db.js
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // Standardbenutzername für XAMPP
  password: '',         // Standardpasswort ist leer
  database: 'gildenallianz', // Deine Datenbank
});

// Verbindung zur Datenbank herstellen
connection.connect((err) => {
  if (err) {
    console.error('Fehler bei der Verbindung zur Datenbank: ' + err.stack);
    return;
  }
  console.log('Verbunden als ID ' + connection.threadId);
});

module.exports = connection;
