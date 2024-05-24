<template>
  <div class="MyList">
    <h1>Mis Lista</h1>
    <div class="favorites">
      <div v-if="favorites.length === 0">
        <p>No tienes películas favoritas.</p>
      </div>
      <div class="container_favorite" v-for="movie in favorites" :key="movie.id">
        <NuxtLink :to="`/movie/${movie.id}`">
          <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title">
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      favorites: [],
    };
  },
  mounted() {
    this.getFavorites();
  },
  methods: {
    getFavorites() {
      const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      this.favorites = favorites;
    },
  },
};
</script>

<style scoped>
.MyList {
  height: 100vh;
  padding: 90px 0px 0px 20px;
  color:rgba(212, 29, 29, 0.865);
}

.favorites {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.container_favorite {
  margin-bottom: 20px;
}

.container_favorite img {
  width: 200px;
  margin-right: 10px;
}
</style>