<template>
  <div>
    <div v-if="article.id == null">Article Not Found</div>
    <article v-else>
      <header>
        <h4>{{ article.title }}</h4>
        <p>
          <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
          <time>{{ new Date(article.postDate).toLocaleString() }}</time>
        </p>
      </header>
      <p>
        {{ article.content }}
      </p>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'AppBlogArticle',
  data() {
    return {
      article: this.$store.state.article.article
    }
  },
  async asyncData({ params, store }) {
    await store.dispatch('article/getArticle', { id: params.id })
    return {}
  },
  validate({ params }) {
    // params.id must be number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/common/colors"

.comment-user
  cursor pointer
  font-weight bold
  &:hover
    color $title-hover
  &.comment-user-main
    font-size 18px
  &.comment-user-minor
    font-size 16px
</style>
