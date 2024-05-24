<template>
  <div class="Movie">
    <h1 class="text_welcome">Welcome, you will find the best movies. Explore now.</h1>
    <div class="search_container">
      <input class="search_movie" type="text" v-model="searchTerm" @keyup.enter="searchMovies"
        placeholder="Seacrh movie..." />
      <button class="btn_search_movie" @click="searchMovies">Search</button>
    </div>
    <div v-if="isLoading">
      <p>Cargando...</p>
    </div>
    <div v-else-if="error">
      <p>Error al obtener películas. Por favor, inténtalo de nuevo más tarde.</p>
    </div>
    <div class="container_movie" v-else-if="!selectedMovie">
      <div class="info_movie" v-for="movie in displayedMovies" :key="movie.id">
        <NuxtLink :to="`/movie/${movie.id}`">
          <img class="img_movie" :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
          <h2 class="title_movie">{{ movie.title }}</h2>
        </NuxtLink>
        <div class="info_bottom">
          <p class="releaseDate_movie">{{ formatDate(movie.release_date) }}</p>
          <div class="icons">
            <button class="btn_favorite" v-tooltip="'Add to favorite'" @click="toggleFavorite(movie)">
              <font-awesome-icon v-if="isFavorite(movie.id)" class="icon_check" icon="check" />
              <font-awesome-icon v-else class="icon_plus" icon="plus" />
            </button>
            <NuxtLink :to="`/movie/${movie.id}`">
              <font-awesome-icon v-tooltip="'Play'" class="icon_play" icon="play" />
            </NuxtLink>
          </div>
        </div>
      </div>
      <p v-if="displayedMovies.length === 0 && !isLoading">No se encontraron resultados.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { Ref } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Movie } from '~/types/Movie';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const allMovies = ref<Movie[]>([]);
const displayedMovies = ref<Movie[]>([]);
const selectedMovie = ref<Movie | null>(null);
const isLoading = ref(false);
const error = ref('');
const route = useRoute();
const searchTerm = ref('');

const searchMovies = () => {
  const searchTermLowerCase = searchTerm.value.toLowerCase();
  displayedMovies.value = allMovies.value.filter(movie =>
    movie.title.toLowerCase().includes(searchTermLowerCase)
  );
};

const toggleFavorite = (movie: Movie) => {
  const storedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = storedFavorites.findIndex((fav: Movie) => fav.id === movie.id);
  const updatedFavorites = [...storedFavorites];
  if (index === -1) {
    updatedFavorites.push(movie);
  } else {
    updatedFavorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  favorites.value = updatedFavorites;
};

const favorites: Ref<Movie[]> = ref<Movie[]>([]);

if (process.client) {
  const storedFavorites = localStorage.getItem('favorites');
  if (storedFavorites) {
    favorites.value = JSON.parse(storedFavorites);
  }
}

const isFavorite = (movieId: number) => {
  return favorites.value.some((fav: Movie) => fav.id === movieId);
};


const fetchMovies = async (genreId: string | null) => {
  isLoading.value = true;
  try {
    const params: any = {
      api_key: '53f3e1d3fbfed79960a6076096d187b1',
    };
    if (genreId) {
      params.with_genres = genreId;
    }
    const response = await axios.get('https://api.themoviedb.org/3/discover/movie', { params });
    allMovies.value = response.data.results;
    displayedMovies.value = allMovies.value;
    localStorage.setItem('allMovies', JSON.stringify(response.data.results));
    localStorage.setItem('displayedMovies', JSON.stringify(response.data.results));
  } catch (error) {
    console.error('Error al obtener películas:', error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  const genreId = route.query.genre ? route.query.genre.toString() : null;
  fetchMovies(genreId);
});

watch(route, (newRoute) => {
  const genreId = newRoute.query.genre ? newRoute.query.genre.toString() : null;
  fetchMovies(genreId);
});

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

</script>

<style scoped>
@import '@/assets/css/components/movie/moviePage.css';
</style>
