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
      <input class="search_movie" type="text" v-model="searchTerm" @keyup.enter="searchItems" placeholder="Search for a movie or series..." />
      <button class="btn_search_movie" @click="searchItems">Search</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

interface Genre {
  id: number;
  name: string;
}

const genres = ref<Genre[]>([]);
const allItems = ref<any[]>([]);
const searchTerm = ref('');
const displayedItems = ref<any[]>([]);

const searchResults = computed(() => {
  return allItems.value.filter((item) => {
    if ('title' in item) {
      return item.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    } else if ('name' in item) {
      return item.name.toLowerCase().includes(searchTerm.value.toLowerCase());
    } else {
      return false;
    }
  });
});

const searchItems = () => {
  console.log('Searching items...');
  displayedItems.value = searchResults.value.slice(); 
};



const fetchAllItems = async () => {
  try {
    const [moviesResponse, seriesResponse] = await Promise.all([
      axios.get('https://api.themoviedb.org/3/discover/movie', { params: { api_key: '53f3e1d3fbfed79960a6076096d187b1' } }),
      axios.get('https://api.themoviedb.org/3/tv/popular', { params: { api_key: '53f3e1d3fbfed79960a6076096d187b1' } })
    ]);
    allItems.value = [...moviesResponse.data.results, ...seriesResponse.data.results];
    console.log('All items:', allItems.value);
  } catch (error) {
    console.error('Error al obtener películas y series:', error);
  }
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
  fetchAllItems();
  fetchGenres();
});
</script>

<style scoped>
@import '@/assets/css/components/navBar.css';
</style>