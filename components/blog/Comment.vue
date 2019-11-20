<template>
  <div>
    <h4><fa-icon :icon="['fas', 'comment-dots']" /> Comment</h4>
    <p class="comment-amount mb-2">Total {{ commentAmount }} comments</p>
    <div v-if="comments.length === 0">No one comment yet</div>
    <ul v-for="comment in comments" :key="comment.id">
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
          v-if="comment.hasReply"
          :class="comment.isShowReply ? 'hide-reply' : 'view-reply'"
          @click="toggleReply(comment)"
        >
          <fa-icon
            class="mr-2"
            :icon="['fas', comment.isShowReply ? 'caret-up' : 'caret-down']"
          />
        </div>
        <div
          v-show="comment.isLoddingReply"
          class="text-center justify-content-center"
        >
          <b-spinner variant="info"></b-spinner>
        </div>
        <b-media
          v-for="reply in comment.replies"
          :id="'comment-' + reply.id"
          :key="reply.id"
          class="comment-hint"
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
                @click="commentHint(reply.replyComment.id)"
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
const keyframes = (() => {
  const fr = []
  for (let i = 0; i <= 10; i++) {
    fr.push({ opacity: 1 - i / 10 })
  }
  return fr
})()

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
    async toggleReply(comment) {
      if (comment.isShowReply) {
        comment.replies = []
      } else {
        comment.isLoddingReply = true
        const content = await this.$axios.$get(
          `/api/article-api/comment/replyComments/${comment.id}`
        )
        comment.replies.push(...content)
        comment.isLoddingReply = false
      }
      comment.isShowReply = !comment.isShowReply
    },
    commentHint(id) {
      const el = document.querySelector(`#comment-${id}`)
      // anime
      this.$anime({
        targets: [el],
        easing: 'easeInOutSine',
        keyframes,
        direction: 'alternate',
        loop: 4,
        duration: 400
      })
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

.view-reply,.hide-reply
  link()
  link-hover()

.view-reply::after
    content ' View reply'

.hide-reply::after
    content ' Hide reply'
</style>
