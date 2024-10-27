
<template>
  <div class="register-container">
    <h1>Registrierung</h1>
    <form @submit.prevent="registerUser">
      <input type="text" v-model="username" placeholder="Benutzername" required />
      <input type="password" v-model="password" placeholder="Passwort" required />
      <div class="form-group">
        <label for="guild">Gilde:</label>
        <select v-model="selectedGuild" id="guild" required>
          <option value="">Gilde auswählen</option>
          <option v-for="guild in guilds" :key="guild.id" :value="guild.id">{{ guild.name }}</option>
        </select>
      </div>
      <button type="submit">Registrieren</button>
    </form>
    <p>
      Bereits einen Account? <router-link to="/" class="login-link">Hier einloggen</router-link>
    </p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'; // Importiere Axios hier

export default {
  data() {
    return {
      username: '',
      password: '',
      selectedGuild: '',
      guilds: [],
      errorMessage: '',
    };
  },
  async mounted() {
    console.log("Register Component Loaded");
    await this.fetchGuilds(); // Gilden beim Laden der Komponente abrufen
  },
  methods: {
    async fetchGuilds() {
    try {
        console.log('Fetching guilds from API...'); // Debugging
        const response = await axios.get('http://localhost:5000/api/guilds'); // API-URL
        this.guilds = response.data;
    } catch (error) {
        console.error('Fehler beim Abrufen der Gilden:', error.response ? error.response.data : error);
        this.errorMessage = 'Fehler beim Abrufen der Gilden. Bitte später erneut versuchen.';
    }
},
    async registerUser() {
      try {
        const response = await axios.post('http://localhost:5000/api/register', {
          username: this.username,
          password: this.password,
          guildId: this.selectedGuild,
        });

        if (response.data.success) {
          alert('Registrierung erfolgreich, warte auf Freischaltung');
          this.$router.push('/'); // Nach erfolgreicher Registrierung zur Startseite navigieren
        } else {
          this.errorMessage = 'Registrierung fehlgeschlagen: ' + response.data.message;
        }
      } catch (error) {
        console.error(error);
        this.errorMessage = 'Fehler bei der Registrierung. Bitte überprüfe deine Eingaben.';
      }
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

input, select {
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #333; /* Dunkler Hintergrund für Eingabefelder */
  color: #ffffff; /* Weiße Schriftfarbe */
}

button {
  padding: 10px;
  background-color: blue; /* Button-Hintergrundfarbe ändern */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: darkblue; /* Dunklerer Farbton beim Hover */
}

.login-link {
  color: red; /* Registrieren-Link in rot */
  text-decoration: none; /* Entferne die Unterstreichung */
}

.login-link:hover {
  text-decoration: underline; /* Unterstreichung beim Hover */
}

.error {
  color: red; /* Fehlertextfarbe */
  text-align: center; /* Text zentrieren */
  margin-top: 1rem; /* Abstand nach oben */
}
</style>
