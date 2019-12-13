<template>
  <div class="mt-4">
    <h4>
      <fa-icon :icon="['fas', 'comment-dots']" />
      Comment
    </h4>
    <p class="comment-amount mb-2">Total {{ commentAmount }} comments</p>
    <div v-if="comments.length === 0">No one comment yet</div>
    <b-media
      v-for="comment in comments"
      :id="'comment-' + comment.id"
      :key="comment.id"
      class="mb-2"
    >
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
        <section class="comment-info">
          <span v-if="comment.replyComment" class="reply-popup hide p-2">
            {{ comment.replyComment.content }}
          </span>
          <span class="comment-user mr-2">
            {{ comment.user.username }}
          </span>
          <span class="comment-time">
            <fa-icon :icon="['far', 'clock']" size="xs" />
            <span>
              {{ $moment(comment.createDate).fromNow() }}
            </span>
          </span>
        </section>
        <section class="mb-0">
          <p>
            <a
              v-if="comment.replyComment"
              class="reply-link"
              :href="'#comment-' + comment.replyComment.id"
              @click="commentHint(comment.replyComment.id)"
              @mouseenter="showPopup(comment.id)"
              @mouseout="hidePopup(comment.id)"
            >
              @{{ comment.replyComment.username }} :
            </a>
            {{ comment.content }}
          </p>
        </section>
      </section>
    </b-media>
    <span
      v-show="!isLoddingComents && !(totalPages === pageNumber)"
      class="more-comments mt-1"
      @click="loadComments()"
    >
      <fa-icon class="mr-2" :icon="['fas', 'caret-down']" />
      More Comments
    </span>
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
    await this.loadComments()
  },
  methods: {
    async loadComments() {
      this.isLoddingComents = true
      const { content, pageable, totalPages } = await this.$axios.$get(
        `/api/article-api/comment/articleComments/${this.articleId}/page/${this
          .pageNumber + 1}`
      )
      this.comments.push(...content)
      this.pageNumber = pageable.pageNumber + 1
      this.totalPages = totalPages
      this.isLoddingComents = false
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
    },
    showPopup(id) {
      const el = document.querySelector(`#comment-${id} .reply-popup`)
      el.classList.remove('hide')
      this.$anime({
        targets: [el],
        opacity: 1,
        duration: 300,
        easing: 'easeOutCirc'
      })
    },
    hidePopup(id) {
      const el = document.querySelector(`#comment-${id} .reply-popup`)
      el.classList.add('hide')
      el.style.opacity = 0
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/public';

.comment-amount {
  color: $gray-800;
}

.comment-main {
  min-height: 48px;

  .comment-info {
    position: relative;

    .comment-user {
      font-weight: bold;
    }

    .comment-time {
      color: $gray-800;
    }
    .reply-popup {
      background-color: ivory;
      opacity: 0;
      color: #282828;
      border-radius: 10px;
      max-width: 500px;
      border: 1px solid #aaaaaa;
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;

      &.hide {
        display: none;
      }
    }
  }
}

.more-comments {
  @include link();
}
</style>
