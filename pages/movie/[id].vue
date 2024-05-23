<template>
  <div class="detailPage" v-if="movie">
    <div class="detailView">
      <img class="img_poster" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
      <div class="info_detailView">
        <h2 class="title">{{ movie.title }}</h2>
        <div class="info_top">
          <p class="rating_detailView">{{ formatRating(movie.vote_average) }} ⭐️</p>
          <p class="releaseDate_detailView">{{ formatDate(movie.release_date) }}</p>
        </div>
        <p class="description_detailView">{{ movie.overview }}</p>
      </div>
    </div>
    <div class="container_other">
      <h1 class="text_Others">Others</h1>
      <div class="otherMovies">
        <div class="movieCard" v-for="otherMovie in otherMovies" :key="otherMovie.id">
          <NuxtLink :to="`/movie/${otherMovie.id}`">
            <img :src="'https://image.tmdb.org/t/p/w500' + otherMovie.poster_path" :alt="otherMovie.title">
            <h3>{{ otherMovie.title }}</h3>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="londing_detailView">Cargando...</p>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Movie } from '~/types/Movie';

const movie = ref<Movie | null>(null);
const otherMovies = ref<Movie[]>([]);
const route = useRoute();

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

const fetchOtherMovies = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
      params: {
        api_key: '53f3e1d3fbfed79960a6076096d187b1',
        page: 1
      }
    });
    otherMovies.value = response.data.results.slice(0, 7);
  } catch (error) {
    console.error('Error al obtener otras películas:', error);
  }
};

onMounted(() => {
  fetchMovieDetails();
  fetchOtherMovies();
});

const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};
</script>

<style>
@import '@/assets/css/components/DetailView.css';
</style>