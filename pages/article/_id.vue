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
      <section>
        <br />
        <h4><fa-icon :icon="['fas', 'comment-dots']" />&nbsp; Comments</h4>
        <b-card v-for="(comment, cIndex) in article.comments" :key="cIndex">
          <b-media>
            <span class="mt-0 comment-user comment-user-main"
              >{{ comment.user.username }} :</span
            >
            <p class="ml-4">{{ comment.content }}</p>

            <b-media
              v-for="(ccomment, ccIndex) in comment.comments"
              :key="ccIndex"
              class="ml-4 mt-1"
            >
              <span class="mt-0 comment-user comment-user-minor"
                >{{ ccomment.user.username }} :</span
              >
              <p class="ml-4">
                {{ ccomment.content }}
              </p>
            </b-media>
          </b-media>
        </b-card>
      </section>
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
@import "~assets/styuls/colors"

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
