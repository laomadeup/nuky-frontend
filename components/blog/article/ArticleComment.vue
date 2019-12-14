<template>
  <div class="mt-4">
    <h4>
      <fa-icon :icon="['fas', 'comment-dots']" />
      Comment
    </h4>
    <p class="comment-amount mb-2">{{ commentAmount }} comments</p>
    <div v-if="comments.length === 0">No one commented yet</div>
    <b-media
      v-for="comment in comments"
      :id="`comment-${comment.id}`"
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
        <section class="comment-header">
          <span v-if="comment.replyComment" class="reply-popup hide p-2">
            {{ comment.replyComment.content }}
          </span>
          <span class="comment-user mr-2">
            {{ comment.user.username }}
          </span>
          <span class="comment-time mr-2">
            <fa-icon :icon="['far', 'clock']" size="xs" />
            <span>
              {{ $moment(comment.createDate).fromNow() }}
            </span>
          </span>
        </section>
        <section class="comment-body">
          <p class="mb-1">
            <a
              v-if="comment.replyComment"
              class="reply-link"
              :href="`#comment-${comment.replyComment.id}`"
              @click="commentHint(comment.replyComment.id)"
              @mouseenter="showPopup(comment.id)"
              @mouseout="hidePopup(comment.id)"
            >
              @{{ comment.replyComment.username }} :
            </a>
            {{ comment.content }}
          </p>
        </section>
        <section class="comment-footer">
          <span class="comment-like">
            <span :id="`comment-like-${comment.id}`" class="comment-btn">
              <fa-icon class="text-secondary icon" :icon="['fas', 'heart']" />
            </span>
          </span>
          <span class="comment-dislike">
            <span :id="`comment-dislike-${comment.id}`" class="comment-btn">
              <fa-icon
                class="text-secondary icon"
                :icon="['fas', 'heart-broken']"
              />
            </span>
          </span>
          <span class="ml-2 comment-replay-btn text-secondary">REPLY</span>
          <b-tooltip variant="danger" :target="`comment-like-${comment.id}`">
            Like
          </b-tooltip>
          <b-tooltip
            variant="secondary"
            :target="`comment-dislike-${comment.id}`"
          >
            Dislike
          </b-tooltip>
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
@import '~bootstrap/scss/functions';
@import '~bootstrap/scss/variables';

.comment-amount {
  font-size: 1.2rem;
  color: $gray-600;
}

.comment-main {
  min-height: 48px;

  .comment-header {
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
      color: $gray-900;
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

  .comment-body {
    .reply-link {
      text-decoration: none;
    }
  }

  .comment-footer {
    .comment-like,
    .comment-dislike {
      display: inline-block;
      width: 3rem;

      .comment-btn {
        cursor: pointer;
      }
    }

    .comment-like {
      .comment-btn:hover {
        .icon {
          color: $danger !important;
        }
      }
    }

    .comment-dislike {
      .comment-btn:hover {
        .icon {
          color: $dark !important;
        }
      }
    }

    .comment-replay-btn {
      cursor: pointer;
      font-weight: 500;
      font-size: 0.8rem;
    }
  }
}

.more-comments {
  cursor: pointer;
  font-weight: 500;
  color: $gray-600;

  &:hover {
    color: $blue;
  }
}
</style>
