<template>
  <div class="login-container">
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input type="text" v-model="username" placeholder="Benutzername" required />
      <input type="password" v-model="password" placeholder="Passwort" required />
      <button type="submit">Einloggen</button>
    </form>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p>
      Noch keinen Account? <router-link to="/register" class="register-link">Registrieren</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '', // Variable für Fehlermeldung
    };
  },
  methods: {
    async handleLogin() {
    this.errorMessage = '';
    try {
        const response = await axios.post('http://localhost:5000/api/login', {
            username: this.username,
            password: this.password,
        });
        console.log('Server response:', response.data); // Ausgabe für Debugging

        if (response.data.message === 'Login erfolgreich') {
            localStorage.setItem('username', response.data.user.username);
            localStorage.setItem('guildName', response.data.user.guildName || ''); // Sicherstellen, dass guildName existiert
            this.$router.push('/dashboard');
        } else {
            this.errorMessage = response.data.message || 'Unbekannter Fehler';
        }
    } catch (error) {
        console.error('Login error:', error);
        this.errorMessage = error.response?.data?.message || 'Fehler beim Einloggen.';
    }
},
  },
};
</script>

<style scoped>
.login-container {
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

input {
  margin: 10px 0;
  padding: 10px;
  border: none;
  border-radius: 4px;
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

.register-link {
  color: red; /* Registrieren-Link in rot */
  text-decoration: none; /* Entferne die Unterstreichung */
}

.register-link:hover {
  text-decoration: underline; /* Unterstreichung beim Hover */
}

.error-message {
  color: red; /* Fehlernachricht in rot */
  margin: 10px 0;
}
</style>
