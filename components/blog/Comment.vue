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
          <b-img-lazy
            width="48"
            blank
            blank-color="#abc"
            alt="avatar"
            :src="comment.user.avatar"
          ></b-img-lazy>
        </template>
        <div class="comment-main mb-2">
          <span class="comment-user mr-2">
            {{ comment.user.username }}
          </span>
          <span class="comment-time">
            <fa-icon class="align-middle" :icon="['far', 'clock']" size="xs" />
            <span class="align-middle">
              {{ $moment(comment.createDate).fromNow() }}
            </span>
          </span>
          <p class="mb-0">
            {{ comment.content }}
          </p>
        </div>
        <b-media v-for="(reply, rIndex) in comment.replies" :key="rIndex">
          <template v-slot:aside>
            <b-img-lazy
              width="32"
              blank
              blank-color="#abc"
              alt="avatar"
              class="mt-2"
              :src="reply.user.avatar"
            ></b-img-lazy>
          </template>
          <div class="mt-1 mb-2">
            <span class="comment-user mr-2">
              {{ reply.user.username }}
            </span>
            <span class="comment-time">
              <fa-icon
                class="align-middle"
                :icon="['far', 'clock']"
                size="xs"
              />
              <span class="align-middle">
                {{ $moment(reply.createDate).fromNow() }}
              </span>
            </span>

            <p class="mb-0">
              {{ reply.content }}
            </p>
          </div>
        </b-media>
        <div
          v-if="comment.hasReply"
          class="view-reply"
          @click="loadReply(comment)"
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
      for (const item of content) {
        item.pageNumber = 0
      }
      this.comments.push(...content)
      this.pageNumber = pageable.pageNumber + 1
      this.totalPages = totalPages
    },
    async loadReply(comment) {
      const { content, pageable, totalPages } = await this.$axios.$get(
        `/api/article-api/comment/replyComments/${
          comment.id
        }/page/${comment.pageNumber + 1}`
      )
      comment.pageNumber = pageable.pageNumber + 1
      comment.hasReply = comment.pageNumber < totalPages
      comment.replies.push(...content)
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
