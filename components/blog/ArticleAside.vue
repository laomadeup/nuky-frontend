<template>
  <div>
    <h5><fa-icon class="text-danger" :icon="['fas', 'fire-alt']" /> Popular</h5>
    <nuxt-link
      v-for="(article, index) in popularArticles"
      :key="index"
      class="mb-2 link-title link-title-popular"
      tag="p"
      :to="{ name: 'article-id', params: { id: article.id } }"
      :title="article.title"
    >
      {{ article.title }}
    </nuxt-link>
  </div>
</template>

<script>
const oneHourMilliseconds = 60 * 60 * 1000
export default {
  name: 'ArticleAside',
  data() {
    return { popularArticles: this.$store.state.article.popularArticles.data }
  },
  async mounted() {
    // async data from server if data deprecated
    if (
      new Date().getTime() -
        this.$store.state.article.popularArticles.fetchTime >
      oneHourMilliseconds
    ) {
      await this.$store.dispatch('article/getPopularArticles')
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/article/main"
</style>
