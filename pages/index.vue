<template>
  <div class="Movie">
    <h1>Películas</h1>
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
          <p class="releaseDate_movie">{{ movie.release_date }}</p>
        </NuxtLink>
        <button @click="toggleFavorite(movie)">Agregar a mi Lista</button>
      </div>
      <p v-if="displayedMovies.length === 0 && !isLoading">No se encontraron resultados.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import type { Movie } from '~/types/Movie';

const searchTerm = ref('');
const allMovies = ref<Movie[]>([]);
const displayedMovies = ref<Movie[]>([]);
const selectedMovie = ref<Movie | null>(null);
const isLoading = ref(false);
const error = ref('');
const route = useRoute();

const toggleFavorite = (movie: Movie) => {
  const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  const index = favorites.findIndex((fav: Movie) => fav.id === movie.id);
  if (index === -1) {
    favorites.push(movie);
  } else {
    favorites.splice(index, 1);
  }
  localStorage.setItem('favorites', JSON.stringify(favorites));
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
</script>

<style scoped>
.Movie {
  padding: 90px 40px 0px;
}

.container_movie {
  padding: 30px 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 2em;
}

.info_movie {
  max-width: 200px;
}

.releaseDate_movie,
.title_movie {
  font-size: 15px;
  max-width: 100%;
  color: black;
}

.img_movie {
  width: 100%;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.749);
}
</style>