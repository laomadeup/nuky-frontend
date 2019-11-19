<template>
  <div>
    <h4><fa-icon :icon="['fas', 'comment-dots']" /> Comment</h4>
    <p class="comment-amount mb-2">total {{ commentAmount }} comments</p>
    <div v-if="comments.length === 0">No one comment yet</div>
    <ul
      v-for="(comment, cIndex) in comments"
      :key="cIndex"
      class="list-unstyled"
    >
      <b-media :id="'comment-' + comment.id" tag="li">
        <template v-slot:aside>
          <b-img-lazy
            width="48"
            blank
            blank-color="#abc"
            alt="avatar"
            :src="comment.user.avatar"
          ></b-img-lazy>
        </template>
        <section class="comment-main mb-2">
          <span class="comment-user mr-2">
            {{ comment.user.username }}
          </span>
          <span class="comment-time">
            <fa-icon :icon="['far', 'clock']" size="xs" />
            <span>
              {{ $moment(comment.createDate).fromNow() }}
            </span>
          </span>
          <p class="mb-0">
            {{ comment.content }}
          </p>
        </section>
        <div
          v-if="comment.hasReply && !comment.isShowReply"
          class="reply-link view-reply"
          @click="loadReply(comment)"
        >
          <fa-icon class="mr-2" :icon="['fas', 'caret-down']" />
        </div>
        <div
          v-if="comment.hasReply && comment.isShowReply"
          class="reply-link hide-reply"
          @click="hideReply(comment)"
        >
          <fa-icon class="mr-2" :icon="['fas', 'caret-up']" />
        </div>
        <div
          v-show="comment.isLoddingReply"
          class="text-center justify-content-center"
        >
          <b-spinner variant="info"></b-spinner>
        </div>
        <b-media
          v-for="(reply, rIndex) in comment.replies"
          :id="'comment-' + reply.id"
          :key="rIndex"
        >
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
          <section class="mt-1 mb-2">
            <span class="comment-user mr-2">
              {{ reply.user.username }}
            </span>
            <span class="comment-time">
              <fa-icon :icon="['far', 'clock']" size="xs" />
              <span>
                {{ $moment(reply.createDate).fromNow() }}
              </span>
            </span>

            <p class="mb-0">
              <a
                v-if="reply.replyComment"
                :href="'#comment-' + reply.replyComment.id"
              >
                @{{ reply.replyComment.user.username }} :
              </a>
              {{ reply.content }}
            </p>
          </section>
        </b-media>
      </b-media>
    </ul>
    <div v-show="isLoddingComents" class="text-center justify-content-center">
      <b-spinner variant="info"></b-spinner>
    </div>
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
    },
    commentAmount: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      pageNumber: 0,
      totalPages: 0,
      comments: [],
      isLoddingComents: false
    }
  },
  async mounted() {
    window.addEventListener('scroll', this.handleScroll)
    await this.loadComments()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      if (
        this.commentAmount === 0 ||
        this.pageNumber === this.totalPages ||
        this.isLoddingComents
      ) {
        return
      }
      const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop
      const windowHeight =
        document.documentElement.clientHeight || document.body.clientHeight
      const scrollHeight =
        document.documentElement.scrollHeight || document.body.scrollHeight
      if (scrollTop + windowHeight >= scrollHeight) {
        this.loadComments()
      }
    },
    async loadComments() {
      this.isLoddingComents = true
      const { content, pageable, totalPages } = await this.$axios.$get(
        `/api/article-api/comment/articleComments/${this.articleId}/page/${this
          .pageNumber + 1}`
      )
      for (const item of content) {
        item.isShowReply = false
        item.isLoddingReply = false
      }
      this.comments.push(...content)
      this.pageNumber = pageable.pageNumber + 1
      this.totalPages = totalPages
      this.isLoddingComents = false
    },
    async loadReply(comment) {
      comment.isLoddingReply = true
      const content = await this.$axios.$get(
        `/api/article-api/comment/replyComments/${comment.id}`
      )
      comment.isShowReply = true
      comment.replies.push(...content)
      comment.isLoddingReply = false
    },
    hideReply(comment) {
      comment.replies = []
      comment.isShowReply = false
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/common/colors"
@import "~assets/style/common/public"

.comment-amount
  color $lignt-text-color

.comment-main
  min-height 48px

.comment-user
  font-weight bold

.comment-time
  color $lignt-text-color

.reply-link
  link()
  link-hover()

.view-reply::after
    content ' View reply'

.hide-reply::after
    content ' Hide reply'
</style>
