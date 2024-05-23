<template>
    <div class="detailView" v-if="series">
        <img class="img_poster" :src="'https://image.tmdb.org/t/p/w500' + series.poster_path" :alt="series.name">
        <div class="info_detailView">
            <h2>{{ series.name }}</h2>
            <p class="description_detailView" >Descripción: {{ series.overview }}</p>
            <p class="releaseDate_detailView">Fecha de lanzamiento: {{ series.first_air_date }}</p>
            <p class="rating_detailView">Calificación: {{ series.vote_average }}</p>
            <button class="btnGoBack_detailView" @click="goBack"><</button>
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

const fetchSeriesDetails = async () => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/tv/${route.params.id}`, {
            params: {
                api_key: '53f3e1d3fbfed79960a6076096d187b1'
            }
        });
        series.value = response.data;
    } catch (error) {
        console.error('Error al obtener detalles de la serie:', error);
    }
};

const goBack = () => {
    push('/series/series');
};

onMounted(() => {
    fetchSeriesDetails();
});
</script>