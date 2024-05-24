<template>
  <div class="MyList">
    <h1>Mi Lista</h1>
    <div class="favorites">
      <div v-if="favorites.length === 0">
        <p>No tienes elementos favoritos.</p>
      </div>
      <div class="container_favorite" v-for="item in favorites" :key="item.id">
        <NuxtLink :to="`/movie/${item.id}`">
          <img :src="'https://image.tmdb.org/t/p/w500' + item.poster_path" :alt="item.title">
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
  padding: 90px 0 0 20px;
  color: rgba(212, 29, 29, 0.865);
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
