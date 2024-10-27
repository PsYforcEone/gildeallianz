<template>
  <div class="register-container">
    <h1>Registrieren</h1>
    <form @submit.prevent="handleRegister">
      <input type="text" v-model="username" placeholder="Benutzername" required />
      <input type="password" v-model="password" placeholder="Passwort" required />
      <input type="password" v-model="confirmPassword" placeholder="Passwort bestätigen" required />
      
      <!-- Dropdown-Menü für die Gilden -->
      <label for="guild">Wählen Sie eine Gilde:</label>
      <select v-model="selectedGuild" id="guild" required>
        <option value="" disabled>Bitte auswählen</option>
        <option v-for="guild in guilds" :key="guild">{{ guild }}</option>
      </select>
      
      <button type="submit">Registrieren</button>
    </form>
    <p>
      Bereits einen Account? <router-link to="/" class="login-link">Einloggen</router-link> <!-- Link zur Startseite -->
    </p>
  </div>
</template>

<script>
import axios from 'axios'; // Stellen Sie sicher, dass Sie axios importiert haben

export default {
  data() {
    return {
      username: '',
      password: '',
      confirmPassword: '',
      guilds: [], // Array für die Gilden
      selectedGuild: '' // Ausgewählte Gilde
    };
  },
  mounted() {
    this.fetchGuilds(); // Gilden beim Laden der Komponente abrufen
  },
  methods: {
    async fetchGuilds() {
      try {
        const response = await axios.get('/api/guilds'); // API-Endpoint abrufen
        this.guilds = response.data; // Gildendaten setzen
        console.log(this.guilds); // Überprüfen, ob die Gilden erfolgreich geladen werden
      } catch (error) {
        console.error('Fehler beim Abrufen der Gilden:', error.response ? error.response.data : error.message);
      }
    },
    handleRegister() {
      // Validierung der Passwörter
      if (this.password !== this.confirmPassword) {
        alert("Die Passwörter stimmen nicht überein.");
        return;
      }

      // Hier könnte Ihre Registrierungs-Logik stehen
      console.log(`Registriere Benutzer ${this.username} in der Gilde ${this.selectedGuild}`);
    },
  },
};
</script>

<style scoped>
.register-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* Für vertikale Zentrierung */
  background-color: #121212; /* Dunkler Hintergrund für Dark Mode */
  color: #ffffff; /* Textfarbe */
}

form {
  display: flex;
  flex-direction: column;
  width: 300px; /* Breite des Formulars */
}

input,
select {
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 4px;
}

button {
  padding: 10px;
  background-color: blue; /* Button-Hintergrundfarbe */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: darkblue; /* Dunklerer Farbton beim Hover */
}

.login-link {
  color: red; /* Einloggen-Link in rot */
  text-decoration: none; /* Entferne die Unterstreichung */
}

.login-link:hover {
  text-decoration: underline; /* Unterstreichung beim Hover */
}
</style>
