<template>
  <div>
    <h5>Popular</h5>
    <p v-for="(article, index) in popularArticles" :key="index">
      <nuxt-link :to="{ name: 'article-id', params: { id: article.id } }">
        {{ article.title }}
      </nuxt-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'ArticleAside',
  data() {
    return { popularArticles: this.$store.state.article.popularArticles }
  },
  mounted() {
    // async data from server
  }
}
</script>

<style scoped lang="stylus"></style>
