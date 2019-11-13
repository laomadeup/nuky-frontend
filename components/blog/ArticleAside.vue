<template>
  <div>
    <h5>
      <fa-icon class="text-danger" :icon="['fas', 'fire-alt']" />
      Popular
    </h5>
    <nuxt-link
      v-for="(article, index) in popularArticles"
      :id="'pop-' + article.id"
      :key="index"
      class="mb-2 pt-2 popular-item"
      tag="p"
      :to="{ name: 'article-id', params: { id: article.id } }"
    >
      {{ article.title }}
      <b-popover
        :target="'pop-' + article.id"
        triggers="hover"
        placement="bottom"
        variant="dark"
      >
        {{ article.title }}
      </b-popover>
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
@import "~assets/style/common/colors"

.popular-item
  cursor pointer
  border-top 1px solid #cccccc
  line-height 1.4rem
  overflow  hidden
  text-overflow ellipsis
  white-space nowrap
  &:hover
    color $title-hover
    text-decoration-line underline
  &:last-child
    border-bottom 1px solid #cccccc
    padding-bottom 0.5rem
</style>
