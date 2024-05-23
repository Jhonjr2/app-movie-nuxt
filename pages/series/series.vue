<template>
    <div>
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
      <div v-else>
        <div v-for="series in displayedSeries" :key="series.id">
          <NuxtLink :to="`/series/${series.id}`">
            <h2>{{ series.name }}</h2>
            <img :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name">
            <p>Fecha de lanzamiento: {{ series.first_air_date }}</p>
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
  