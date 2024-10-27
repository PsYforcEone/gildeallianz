<template>
    <div class="dashboard">
      <h2>Dashboard</h2>
      <div>
        <h3>Neuigkeiten</h3>
        <ul>
          <li v-for="news in newsList" :key="news.id">{{ news.title }}</li>
        </ul>
      </div>
      <div>
        <h3>Termine</h3>
        <ul>
          <li v-for="event in eventList" :key="event.id">{{ event.date }} - {{ event.description }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        newsList: [],
        eventList: [],
      };
    },
    async created() {
      await this.fetchDashboardData();
    },
    methods: {
      async fetchDashboardData() {
        try {
          const response = await axios.get('/api/data/dashboard');
          this.newsList = response.data.news;
          this.eventList = response.data.events;
        } catch (error) {
          console.error('Fehler beim Abrufen der Dashboard-Daten:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* CSS-Stile für das Dashboard */
  .dashboard {
    max-width: 800px;
    margin: auto;
  }
  </style>
  