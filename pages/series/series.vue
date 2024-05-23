<template>
    <div  class="Serie">
      <h1>Series</h1>
      <div>
        <input type="text" v-model="searchTerm" @keydown.enter.prevent>
        <button @click="searchSeries">Buscar</button>
      </div>
      <div v-if="isLoading">
        <p>Cargando...</p>
      </div>
      <div v-else-if="error">
        <p>Error al obtener series. Por favor, inténtalo de nuevo más tarde.</p>
      </div>
      <div class="container_serie" v-else>
        <div class="info_serie" v-for="series in displayedSeries" :key="series.id">
          <NuxtLink :to="`/series/${series.id}`">
            <img class="img_serie" :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name">
            <h2 class="title_serie">{{ series.name }}</h2>
            <p class="releaseDate_serie">Fecha de lanzamiento: {{ series.first_air_date }}</p>
          </NuxtLink>
        </div>
        <p v-if="displayedSeries.length === 0 && !isLoading">No se encontraron resultados.</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import type { Series } from '~/types/Series';
  
  const searchTerm = ref('');
  const allSeries = ref<Series[]>([]);
  const displayedSeries = ref<Series[]>([]);
  const isLoading = ref(false);
  const error = ref('');
  
  const fetchAllSeries = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
        params: {
          api_key: '53f3e1d3fbfed79960a6076096d187b1'
        }
      });
      allSeries.value = response.data.results;
      displayedSeries.value = allSeries.value;
    } catch (error) {
      console.error('Error al obtener series:', error);
    } finally {
      isLoading.value = false;
    }
  };
  
  const searchSeries = () => {
    if (!searchTerm.value) {
      displayedSeries.value = allSeries.value;
      return;
    }
    const filteredSeries = allSeries.value.filter(series =>
      series.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
    displayedSeries.value = filteredSeries;
  };
  
  onMounted(() => {
    fetchAllSeries();
  });
  </script>

<style scoped>
.Serie {
  padding: 90px 40px 0px;
}

.container_serie {
  padding: 30px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
}

.info_serie {
  max-width: 200px;
}

.releaseDate_serie,
.title_serie {
  font-size: 15px;
  max-width: 100%;
  color: black;
}

.img_serie {
  width: 100%;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.749);
}
</style>
  