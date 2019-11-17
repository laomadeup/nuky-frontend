<template>
  <section>
    <br />
    <h4><fa-icon :icon="['fas', 'comment-dots']" />&nbsp; Comments</h4>
    <div v-for="(comment, cIndex) in comments" :key="cIndex">
      <span> {{ comment.user.username }}</span>
      <span> {{ $moment(comment.createDate).fromNow() }}</span>
      <p class="ml-4">{{ comment.content }}</p>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Comment',
  props: {
    articleId: {
      type: Number,
      default: null,
      isValid(value) {
        return value != null
      }
    }
  },
  data() {
    return {
      pageNumber: 0,
      totalPages: 0,
      comments: []
    }
  },
  async mounted() {
    await this.loadComments()
  },
  methods: {
    async loadComments() {
      const { content, pageable, totalPages } = await this.$axios.$get(
        `/api/article-api/comment/articleComments/${this.articleId}/page/${this
          .pageNumber + 1}`
      )
      this.comments.push(...content)
      this.pageNumber = pageable.pageNumber + 1
      this.totalPages = totalPages
    }
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
