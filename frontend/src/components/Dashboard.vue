<template>
  <div class="dashboard-container">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <img src="@/assets/logo.png" alt="Logo" class="logo" />
        <h1>{{ guildName }}</h1>
      </div>
      <div class="header-right">
        <img src="@/assets/profile-placeholder.png" alt="Profilbild" class="profile-pic" />
        <div class="user-dropdown">
          <span @click="toggleDropdown" class="username">{{ username }}</span>
          <div v-if="dropdownOpen" class="dropdown-menu">
            <router-link to="/dashboard/profile">Profil</router-link>
            <router-link to="/dashboard/settings">Einstellungen</router-link>
            <button @click="handleLogout" class="dropdown-logout">Logout</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Sidebar -->
    <nav class="sidebar">
      <h3 class="nav-title">Navigation</h3>
<ul>
  <li>
    <router-link to="/dashboard">
      <i class="fa fa-home"></i> Übersicht
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/members">
      <i class="fa fa-users"></i> Mitglieder
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/weekly-planing">
      <i class="fa fa-calendar"></i>  Wochenplanung
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/priority-list">
      <i class="fa fa-clipboard-list"></i> Prio Liste
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/events">
      <i class="fa fa-calendar"></i> Events
    </router-link>
  </li>
</ul>

<!-- Neue Kategorie "Leader" -->
<h3 class="nav-title">Leader</h3>
<ul>
  <li>
    <router-link to="/dashboard/members">
      <i class="fa fa-users"></i> Benutzerkonten
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/events-leader">
      <i class="fa fa-calendar"></i> Events
    </router-link>
  </li>
  <li>
    <router-link to="/dashboard/news">
      <i class="fa fa-newspaper"></i> News
    </router-link>
  </li>
</ul>


    </nav>

    <!-- Main Content -->
    <main class="content">
      <h2 class="content-title">Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">Events</h3>
            </div>
            <div class="box-body" style="background-image: -webkit-linear-gradient(right, rgba(0,0,0,0) 0%, rgba(41, 41, 41, 0.822) 100%), url('https://via.placeholder.com/600x248'); background-size: cover; background-repeat: no-repeat; height: 248px;">
              <div class="card-inner" style="z-index: 1; font-size: 1.4vh;">
                <p style="color: #04a5d1; font-size: 19px; font-weight: bold; font-family: Oswald; text-shadow: 0 0 .5em #04a5d1;">Nächster Krieg</p>
                <p style="position: relative; bottom: 11px;">27.10.24 - 00:58 Uhr</p>
                <p style="position: relative; bottom: 11px; text-transform: uppercase;">Gildenbosse geplant</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">Nächster Krieg</h3>
            </div>
            <div class="box-body" style="background-image: -webkit-linear-gradient(right, rgba(0,0,0,0) 0%, rgba(41, 41, 41, 0.822) 100%), url('https://via.placeholder.com/600x248'); background-size: cover; background-repeat: no-repeat; height: 248px;">
              <div class="card-inner" style="z-index: 1; font-size: 1.4vh;">
                <p style="color: #04a5d1; font-size: 19px; font-weight: bold; font-family: Oswald; text-shadow: 0 0 .5em #04a5d1;">Nächster Krieg</p>
                <p style="position: relative; bottom: 11px;">27.10.24 - 00:58 Uhr</p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="box box-solid">
            <div class="box-header with-border">
              <h3 class="box-title">Gildenbosse</h3>
            </div>
            <div class="box-body" style="background-image: -webkit-linear-gradient(right, rgba(0,0,0,0) 0%, rgba(41, 41, 41, 0.822) 100%), url('https://via.placeholder.com/600x248'); background-size: cover; background-repeat: no-repeat; height: 248px;">
              <div class="card-inner" style="z-index: 1; font-size: 1.4vh;">
                <p style="color: #04a5d1; font-size: 19px; font-weight: bold; font-family: Oswald; text-shadow: 0 0 .5em #04a5d1;">Gildenbosse geplant</p>
                <p style="position: relative; bottom: 11px;">27.10.24 - 00:58 Uhr</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
      <p>© 2024 JaxGreen. Alle Rechte vorbehalten.</p>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: localStorage.getItem('username') || '',
      guildName: localStorage.getItem('guildName') || '',
      dropdownOpen: false,
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('username');
      localStorage.removeItem('guildId');
      localStorage.removeItem('guildName');
      this.$router.push('/login');
    },
    toggleDropdown() {
      this.dropdownOpen = !this.dropdownOpen;
    },
  },
  watch: {
    $route() {
      this.dropdownOpen = false;
    },
  },
};
</script>

<style scoped>
.dashboard-container {
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 250px 1fr;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  height: 100vh;
  color: #ffffff;
}

/* Header-Styling */
.header {
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #1e1e1e;
  border-bottom: 2px solid #ccc; /* Hellgraue Linie unter dem Header */
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  color: #ffffff;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-dropdown {
  position: relative;
  cursor: pointer;
}

.user-dropdown span {
  margin-right: 10px;
}

.profile-pic {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
}

.username {
  font-size: 16px; /* Schriftgröße für den Benutzernamen anpassen */
  font-family: 'Oswald', sans-serif; /* Schriftart für den Benutzernamen */
}

/* Dropdown-Menü */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #333;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.dropdown-menu a,
.dropdown-menu button {
  color: white;
  text-decoration: none;
  padding: 8px;
  cursor: pointer;
}

.dropdown-menu a:hover,
.dropdown-menu button:hover {
  background-color: #444;
}

.dropdown-logout {
  background: none;
  border: none;
  text-align: left;
  padding: 8px;
  cursor: pointer;
}

/* Sidebar-Styling */
.sidebar {
  grid-area: sidebar;
  background-color: #1e1e1e; /* Gleiche Farbe wie der Header */
  padding: 20px;
}

.sidebar h3 {
  color: #aaaaaa; /* Dunkleres Grau für die Titel */
  font-size: 16px;
  margin-top: 20px; /* Abstand oben hinzufügen */
  margin-bottom: 10px; /* Abstand unten hinzufügen */
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 15px 0;
}

.sidebar a {
  color: white;
  text-decoration: none;
  display: block;
  padding: 10px; /* Mehr Platz um die Links */
  font-size: 16px; /* Schriftgröße für die Links in der Navbar */
  font-family: 'Oswald', sans-serif; /* Schriftart für die Links */
}

.sidebar a:hover {
  background-color: #444; /* Box-Effekt beim Hover */
}

/* Dropdown für Leader */
.leader-dropdown {
  position: relative;
}

.dropdown {
  display: none; /* Standardmäßig versteckt */
  position: absolute;
  left: 100%; /* Dropdown auf der rechten Seite */
  top: 0;
  background-color: #333;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.sidebar li:hover .dropdown {
  display: block; /* Dropdown anzeigen beim Hover */
}

/* Main Content */
.content {
  grid-area: content;
  padding: 20px;
  background-color: #2e2e2e; /* Hellere Graufarbe für den Content-Bereich */
  overflow-y: auto;
}

.content-title {
  font-size: 24px; /* Titelgröße im Content */
  margin-bottom: 20px; /* Abstand nach unten */
  color: #ffffff; /* Titel in Weiß */
}

/* Box-Styling */
.row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* Abstand zwischen den Boxen */
}

.col-md-4 {
  width: 25%; /* Breite der Boxen auf 25% reduzieren */
}

.box {
  background-color: #3c3c3c; /* Hintergrundfarbe der Boxen */
  border-radius: 5px;
  overflow: hidden;
  padding: 10px; /* Padding der Boxen reduzieren */
  height: 150px; /* Höhe der Boxen anpassen */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3); /* Optional: Schatten für die Boxen */
}

.box-header {
  background-color: #444; /* Hintergrundfarbe der Kopfzeile */
  padding: 10px;
}

.box-title {
  margin: 0;
  color: #ffffff;
}

/* Footer-Styling */
.footer {
  grid-area: footer;
  background-color: #1e1e1e;
  text-align: center;
  padding: 10px;
  font-size: 12px;
}

/* Abstand zwischen den Menü-Kategorien */
.sidebar ul {
  margin-top: 20px; /* Abstand zwischen den Menükategorien */
}
</style>

