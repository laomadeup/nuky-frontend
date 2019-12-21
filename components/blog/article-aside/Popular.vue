<template>
  <div>
    <h3>
      <v-icon class="verticalalign-text-bottom" color="red">mdi-fire</v-icon>
      Popular
    </h3>
    <div
      v-for="(article, index) in this.$store.state.article.popularArticles"
      :key="index"
      :title="article.title"
    >
      <v-divider class="my-2" />
      <nuxt-link
        class="px-2 my-1 popular-item"
        tag="p"
        :to="{ name: 'article-id', params: { id: article.id } }"
      >
        {{ article.title }}
      </nuxt-link>
    </div>
    <v-divider class="my-2" />
  </div>
</template>

<script>
export default {
  name: 'Popular',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.popular-item {
  cursor: pointer;
  line-height: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-item:hover {
  color: map-get($blue, lighten-1);
  text-decoration-line: none;
}
</style>
