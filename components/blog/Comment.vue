<template>
  <div>
    <h4><fa-icon :icon="['fas', 'comment-dots']" />&nbsp; Comments</h4>
    <ul
      v-for="(comment, cIndex) in comments"
      :key="cIndex"
      class="list-unstyled"
    >
      <b-media tag="li">
        <template v-slot:aside>
          <b-img blank blank-color="#abc" width="48" alt="placeholder"></b-img>
        </template>
        <div class="comment-main mb-2">
          <span class="comment-user mr-2">
            {{ comment.user.username }}
          </span>
          <span class="comment-time">
            {{ $moment(comment.createDate).fromNow() }}
          </span>
          <p class="mb-0">
            {{ comment.content }}
          </p>
        </div>
        <b-media v-for="(reply, rIndex) in comment.replies" :key="rIndex">
          <template v-slot:aside>
            <b-img
              blank
              blank-color="#ccc"
              width="32"
              alt="placeholder"
              class="mt-2"
            ></b-img>
          </template>
          <div class="mt-1 mb-2">
            <span class="comment-user mr-2">
              {{ reply.user.username }}
            </span>
            <span class="comment-time">
              {{ $moment(reply.createDate).fromNow() }}
            </span>

            <p class="mb-0">
              {{ reply.content }}
            </p>
          </div>
        </b-media>
        <div
          v-if="comment.hasReply"
          class="view-reply"
          @click="loadReply(comment.id)"
        >
          <fa-icon class="mr-2" :icon="['fas', 'caret-down']" />
        </div>
      </b-media>
    </ul>
  </div>
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
    },
    loadReply(commentId) {
      console.log('loading reply comment : ', commentId)
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/common/colors"
@import "~assets/style/common/public"
.comment-main
  min-height 48px

.comment-user
  font-weight bold

.comment-time
  color $lignt-text-color

.view-reply
  link()
  link-hover()

  &::after
    content ' View reply'
</style>
