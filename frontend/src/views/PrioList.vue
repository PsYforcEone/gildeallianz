<template>
    <div class="prio-list">
      <h2>Prio-Liste</h2>
      <form @submit.prevent="savePrioList">
        <div>
          <label for="boss">Boss:</label>
          <select v-model="selectedBoss" @change="fetchItems">
            <option v-for="boss in bosses" :key="boss.id" :value="boss.id">{{ boss.name }}</option>
          </select>
        </div>
        <div v-for="(item, index) in priorityItems" :key="index">
          <label for="item">Item {{ index + 1 }}:</label>
          <input type="text" v-model="item.name" placeholder="Item-Name" />
          <label for="priority">Priorität:</label>
          <select v-model="item.priority">
            <option v-for="p in priorities" :key="p">{{ p }}</option>
          </select>
        </div>
        <button type="submit">Speichern</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        bosses: [],               // Liste der Bosse
        selectedBoss: null,      // Aktuell ausgewählter Boss
        priorityItems: [         // Liste der Items mit Prioritäten
          { name: '', priority: '' },
          { name: '', priority: '' },
          { name: '', priority: '' },
        ],
        priorities: ['Prio 1', 'Prio 2', 'Prio 3'], // Prioritätsoptionen
      };
    },
    async created() {
      await this.fetchBosses();
    },
    methods: {
      async fetchBosses() {
        // Hier sollten Sie die Bosse von der API abrufen
        // Zum Beispiel: const response = await axios.get('/api/data/bosses');
        this.bosses = [
          { id: 1, name: 'Boss A' },
          { id: 2, name: 'Boss B' },
        ]; // Beispiel-Daten
      },
      async fetchItems() {
        // Hier sollten Sie die Items basierend auf dem ausgewählten Boss abrufen
        // Zum Beispiel: const response = await axios.get(`/api/data/items/${this.selectedBoss}`);
        if (this.selectedBoss) {
          this.priorityItems = [
            { name: 'Item 1', priority: 'Prio 1' },
            { name: 'Item 2', priority: 'Prio 2' },
            { name: 'Item 3', priority: 'Prio 3' },
          ]; // Beispiel-Daten
        }
      },
      async savePrioList() {
        // Hier sollten Sie die Prio-Liste an die API senden
        try {
          const response = await axios.post('/api/data/prio-list', {
            boss: this.selectedBoss,
            items: this.priorityItems,
          });
          alert('Prio-Liste erfolgreich gespeichert!');
        } catch (error) {
          console.error('Fehler beim Speichern der Prio-Liste:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS-Stile für die Prio-Liste */
  .prio-list {
    max-width: 800px;
    margin: auto;
  }
  </style>
  