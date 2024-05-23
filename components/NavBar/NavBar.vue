<template>
  <div class="header">
    <img class="logo" src="../../public/img/logo.png" alt="Logo" />
    <ul class="headers_menu">
      <li class="header_home">
        <NuxtLink to="/">Movie</NuxtLink>
      </li>
      <li class="header_home">
        <NuxtLink to="/series/series">Series</NuxtLink>
      </li>
      <li class="header_genre">
        <span>Genre</span>
        <ul class="genre_menu">
          <li v-for="genre in genres" :key="genre.id">
            <NuxtLink class="link" :to="{ path: '/', query: { genre: genre.id } }">{{ genre.name }}</NuxtLink>
          </li>
        </ul>
      </li>
      <li class="header_home">
        <NuxtLink to="/my-list">My List</NuxtLink>
      </li>
    </ul>
    <div class="search_container">
      <input class="search_movie" type="text" v-model="searchTerm" @keyup.enter="searchMovies" placeholder="Search for a movie..." />
      <button class="btn_search_movie" @click="searchMovies">Search</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

const genres = ref<Genre[]>([]);
const allMovies = ref<any[]>([]);
const displayedMovies = ref<any[]>([]);

const searchTerm = ref('');
const searchResults = computed(() => {
  return allMovies.value.filter((movie: { title: string }) =>
    movie.title.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const searchMovies = () => {
  displayedMovies.value = searchResults.value;
};

const fetchGenres = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
      params: {
        api_key: '53f3e1d3fbfed79960a6076096d187b1'
      }
    });
    genres.value = response.data.genres;
  } catch (error) {
    console.error('Error al obtener géneros de películas:', error);
  }
};

onMounted(() => {
  if (typeof window !== 'undefined') {
    const storedAllMovies = localStorage.getItem('allMovies');
    const storedDisplayedMovies = localStorage.getItem('displayedMovies');
    
    if (storedAllMovies) {
      allMovies.value = JSON.parse(storedAllMovies);
    }

    if (storedDisplayedMovies) {
      displayedMovies.value = JSON.parse(storedDisplayedMovies);
    }
  }

  fetchGenres();
});
</script>

<style scoped>
@import '@/assets/css/components/navBar.css';
</style>
