import express from 'express';
import mysql from 'mysql2/promise'; // MySQL-Paket für die Verbindung
import dotenv from 'dotenv'; // Für Umgebungsvariablen (optional, aber empfohlen)
import cors from 'cors';

dotenv.config(); // Konfiguriert Umgebungsvariablen

const app = express();
const port = process.env.PORT || 5000;

// MySQL Verbindung
let connection;

async function connectToDatabase() {
    try {
        connection = await mysql.createConnection({
            host: 'localhost',
            user: process.env.DB_USER || 'root', // Benutzername aus Umgebungsvariablen oder Standard
            password: process.env.DB_PASS || '', // Passwort aus Umgebungsvariablen oder Standard
            database: process.env.DB_NAME || 'gildenallianz' // Datenbankname aus Umgebungsvariablen oder Standard
        });
        console.log('Connected to MySQL database');
    } catch (error) {
        console.error('Error connecting to MySQL database:', error);
        process.exit(1); // Beende den Prozess bei Fehler
    }
}

// Middleware für CORS
app.use(cors()); // CORS aktivieren
app.use(express.json()); // Middleware für JSON

// Route zum Abrufen der Gilden
app.get('/api/guilds', async (req, res) => {
    console.log('GET /api/guilds was called'); // Debugging
    try {
        const [guilds] = await connection.execute('SELECT id, name FROM guilds'); // Tabelle klein geschrieben
        console.log('Gilden aus DB abgerufen:', guilds); // Debugging
        res.json(guilds);
    } catch (error) {
        console.error('Error fetching guilds:', error); // Zeigt den gesamten Fehler an
        res.status(500).json({ message: 'Error fetching guilds', error: error.message }); // Sendet den Fehler zurück
    }
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await connection.execute(
            `SELECT users.*, guilds.name as guildName 
             FROM users 
             LEFT JOIN guilds ON users.guildId = guilds.id 
             WHERE users.username = ?`, 
            [username]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'User nicht bekannt' });
        }

        const user = users[0];

        const isPasswordValid = password === user.password; // Ersetze dies durch einen echten Passwortvergleich
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Password falsch' });
        }

        if (!user.guildId) {
            return res.status(403).json({ message: 'Keine Gilde hinterlegt' });
        }

        // Antwort mit guildName, falls vorhanden
        res.json({ message: 'Login erfolgreich', user: { ...user, guildName: user.guildName } });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Fehler beim Login' });
    }
});


// Server starten und Datenbankverbindung herstellen
connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}).catch((error) => {
    console.error('Error starting server:', error);
});
