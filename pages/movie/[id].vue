<template>
  <div class="detailView" :style="{ backgroundImage: `url('https://image.tmdb.org/t/p/w500' + movie.poster_path)` }" v-if="movie">
    <button class="btnGoBack_detailView" @click="goBack"><</button>
    <img class="img_poster" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
    <div class="info_detailView">
      <h2>{{ movie.title }}</h2>
      <p class="description_detailView">Descripción: {{ movie.overview }}</p>
      <p class="releaseDate_detailView">Fecha de lanzamiento: {{ movie.release_date }}</p>
      <p class="rating_detailView">Calificación: {{ movie.vote_average }}</p>
    </div>
  </div>
  <div v-else>
    <p class="londing_detailView">Cargando...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import type { Movie } from '~/types/Movie';

const movie = ref<Movie | null>(null);
const route = useRoute();
const { push } = useRouter();

const fetchMovieDetails = async () => {
  const id = route.params.id;
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: '53f3e1d3fbfed79960a6076096d187b1'
      }
    });
    movie.value = response.data;
  } catch (error) {
    console.error('Error al obtener detalles de la película:', error);
  }
};

const goBack = () => {
  push('/');
};

onMounted(() => {
  fetchMovieDetails();
});
</script>

<style>
@import '@/assets/css/components/movie.css';
</style>