<template>
    <div class="detailPage" v-if="series">
      <div class="detailView">
        <img class="img_poster" :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name">
        <div class="info_detailView">
          <h2 class="title">{{ series.name }}</h2>
          <div class="info_top">
            <p class="rating_detailView">{{ formatRating(series.vote_average) }} ⭐️</p>
            <p class="releaseDate_detailView">{{ formatDate(series.first_air_date) }}</p>
          </div>
          <p class="description_detailView">{{ series.overview }}</p>
        </div>
      </div>
      <div class="container_other">
        <h1 class="text_Others">Others</h1>
        <div class="otherMovies">
          <div class="movieCard" v-for="otherSeries in otherSeries" :key="otherSeries.id">
            <NuxtLink :to="`/series/${otherSeries.id}`">
              <img :src="'https://image.tmdb.org/t/p/w500' + otherSeries.poster_path" :alt="otherSeries.name">
              <h3>{{ otherSeries.name }}</h3>
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
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import type { Series } from '~/types/Series';

const route = useRoute();
const { push } = useRouter();
const series = ref<Series | null>(null);
const otherSeries = ref<Series[]>([]);

const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('es-ES', options);
};

const fetchSeriesDetails = async () => {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/tv/${route.params.id}`, {
      params: {
        api_key: '53f3e1d3fbfed79960a6076096d187b1'
      }
    });
    series.value = response.data;
    fetchOtherSeries();
  } catch (error) {
    console.error('Error al obtener detalles de la serie:', error);
  }
};

const fetchOtherSeries = async () => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3/tv/popular', {
      params: {
        api_key: '53f3e1d3fbfed79960a6076096d187b1',
        page: 1
      }
    });
    otherSeries.value = response.data.results.slice(0, 7); 
  } catch (error) {
    console.error('Error al obtener otras series:', error);
  }
};


onMounted(() => {
  fetchSeriesDetails();
});
</script>

<style>
@import '@/assets/css/components/DetailView.css';
</style>