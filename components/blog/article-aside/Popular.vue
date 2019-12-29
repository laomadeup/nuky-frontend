<template>
  <div>
    <h3>Popular</h3>
    <v-skeleton-loader
      :loading="!this.$store.state.article.popularArticles"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    >
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
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'Popular'
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
