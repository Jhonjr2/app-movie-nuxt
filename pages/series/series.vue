<template>
  <div class="Serie">
    <h1>The best trending Series, explore now and enjoy with your family</h1>
    <div class="search_container">
      <input class="search_series" type="text" v-model="searchTerm" @keyup.enter="searchSeries" placeholder="Search serie..." />
      <button class="btn_search_series" @click="searchSeries">Search</button>
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
        </NuxtLink>
        <div class="info_bottom">
          <p class="releaseDate_serie">{{ formatDate(series.first_air_date) }}</p>
          <div class="iconsSerie">
            <button class="btn_favoriteSerie" v-tooltip="'Add to favorite'" @click="toggleFavorite(series)">
              <font-awesome-icon v-if="isFavorite(series.id)" class="icon_check" icon="check" />
              <font-awesome-icon v-else class="icon_plus" icon="plus" />
            </button>
            <NuxtLink :to="`/series/${series.id}`">
              <font-awesome-icon v-tooltip="'Play'" class="icon_play" icon="play" />
            </NuxtLink>
          </div>
        </div>
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

const toggleFavorite = (series: Series) => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = storedFavorites.findIndex((fav: Series) => fav.id === series.id);
  const updatedFavorites = [...storedFavorites];
  if (index === -1) {
    updatedFavorites.push(series);
  } else {
    updatedFavorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  favorites.value = updatedFavorites;
};

const favorites = ref<Series[]>([]);

if (process.client) {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
}

const isFavorite = (seriesId: number) => {
  return favorites.value.some((fav: Series) => fav.id === seriesId);
};

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

onMounted(() => {
  fetchAllSeries();
});

const searchSeries = () => {
  const searchTermLowerCase = searchTerm.value.toLowerCase();
  displayedSeries.value = allSeries.value.filter(series => {
    const seriesYear = new Date(series.first_air_date).getFullYear().toString();
    return series.name.toLowerCase().includes(searchTermLowerCase) || seriesYear.includes(searchTermLowerCase);
  });
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};
</script>

<style scoped>
@import '@/assets/css/components/series/seriesPage.css';
</style>
