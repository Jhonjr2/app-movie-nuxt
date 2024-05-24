<template>
  <div class="header">
    <img class="logo" src="../../public/img/logo.png" alt="Logo" />
    <button class="menu-toggle" @click="toggleMenu" v-show="isSmallScreen">
      <font-awesome-icon icon="bars" />
    </button>
    <ul class="headers_menu" :class="{ active: isMenuActive }">
      <li class="header_home">
        <NuxtLink to="/" @click="closeMenu">Movie</NuxtLink>
      </li>
      <li class="header_home">
        <NuxtLink to="/series/series" @click="closeMenu">Series</NuxtLink>
      </li>
      <li class="header_genre" @mouseover="showGenreMenu" @mouseleave="hideGenreMenu">
        <span>Genre</span>
        <ul class="genre_menu" :class="{ show: isGenreMenuVisible }">
          <li v-for="genre in genres" :key="genre.id">
            <NuxtLink class="link" :to="{ path: '/', query: { genre: genre.id } }" @click="closeMenu">{{ genre.name }}</NuxtLink>
          </li>
        </ul>
      </li>
      <li class="header_myList">
        <NuxtLink to="/my-list" @click="closeMenu">My List</NuxtLink>
      </li>
    </ul>
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
const isMenuActive = ref(false);
const isGenreMenuVisible = ref(false);
const screenWidth = ref<number | null>(null);

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

const toggleMenu = () => {
  isMenuActive.value = !isMenuActive.value;
};

const closeMenu = () => {
  isMenuActive.value = false;
};

const showGenreMenu = () => {
  isGenreMenuVisible.value = true;
};

const hideGenreMenu = () => {
  isGenreMenuVisible.value = false;
};

const updateScreenWidth = () => {
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
  }
};

onMounted(() => {
  fetchGenres();
  if (typeof window !== 'undefined') {
    screenWidth.value = window.innerWidth;
    window.addEventListener('resize', updateScreenWidth);
  }
});

const isSmallScreen = computed(() => {
  return screenWidth.value !== null && screenWidth.value <= 768;
});
</script>

<style scoped>
@import '@/assets/css/components/navBar.css';
</style>
