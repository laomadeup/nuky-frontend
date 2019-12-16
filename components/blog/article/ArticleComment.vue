<template>
  <div>
    <div class="mt-5">
      <h4 id="scroll-mark">
        <fa-icon :icon="['fas', 'feather-alt']" />
        Add a Comment
      </h4>
      <b-container fluid>
        <b-form @submit.prevent="onSubmitComment">
          <b-row>
            <b-col class="mb-2">
              <b-alert
                id="reply-mark"
                variant="info"
                :show="showReplyAlert"
                dismissible
                fade
                @dismissed="replyAlertDismissed"
              >
                <b-badge variant="danger">Replying</b-badge>
                <b-badge
                  variant="primary"
                  href="#"
                  @click="commentHint(newComment.replyCommentId)"
                  >@{{ newComment.replyUsername }}
                </b-badge>
              </b-alert>
              <b-form-textarea
                id="comment-content-textarea"
                v-model="newComment.content"
                class="comment-input"
                placeholder="Enter your comment..."
                max-rows="10"
                required
              />
              <div class="comment-input-border"></div>
            </b-col>
          </b-row>
          <b-row>
            <b-col md="8" sm="12" class="mb-2">
              <fa-icon
                class="mr-2 comment-input-icon"
                :icon="['fas', 'user-secret']"
              />
              <b-form-input
                v-model="newComment.username"
                required
                class="comment-input pl-4"
                placeholder="Enter your name..."
              ></b-form-input>
              <div class="comment-input-border"></div>
            </b-col>
            <b-col md="4" sm="12">
              <b-button block type="submit" variant="info">
                <fa-icon class="mr-2" :icon="['fas', 'paper-plane']" />
                SUBMIT
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-container>
    </div>
    <div class="mt-5">
      <h4 class="mb-4">
        <fa-icon :icon="['fas', 'comment-dots']" />
        Comments
        <b-badge class="comment-amount" variant="secondary">
          {{ commentAmount }}
        </b-badge>
      </h4>
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
          />
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
              <fa-icon :icon="['far', 'clock']" size="sm" />
              <span>
                {{ $moment(comment.createDate).fromNow() }}
              </span>
            </span>
          </section>
          <section class="comment-body">
            <p class="mb-1">
              <b-badge
                v-if="comment.replyComment"
                variant="primary"
                class="reply-link"
                href="#"
                @click="commentHint(comment.replyComment.id)"
                @mouseenter="showPopup(comment.id)"
                @mouseout="hidePopup(comment.id)"
              >
                @{{ comment.replyComment.username }}
              </b-badge>
              {{ comment.content }}
            </p>
          </section>
          <section class="comment-footer">
            <span class="comment-like">
              <span
                :id="`comment-like-${comment.id}`"
                class="comment-btn"
                @click="like(comment.id)"
              >
                <fa-icon class="text-secondary icon" :icon="['fas', 'heart']" />
              </span>
              <span
                v-show="comment.like > 0"
                class="number"
                v-text="comment.like"
              />
            </span>
            <span class="comment-dislike">
              <span
                :id="`comment-dislike-${comment.id}`"
                class="comment-btn"
                @click="dislike(comment.id)"
              >
                <fa-icon
                  class="text-secondary icon"
                  :icon="['fas', 'heart-broken']"
                />
              </span>
              <span
                v-show="comment.dislike > 0"
                class="number"
                v-text="comment.dislike"
              />
            </span>
            <span
              class="ml-1 comment-replay-btn text-secondary"
              @click="reply(comment.id, comment.user.username)"
              >REPLY</span
            >
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
      isLoddingComents: false,
      newComment: {
        username: null,
        replyCommentId: null,
        replyUsername: null,
        content: ''
      }
    }
  },
  computed: {
    showReplyAlert() {
      return this.newComment.replyCommentId != null
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
      const scrollHeight = el.getBoundingClientRect().top + window.scrollY - 200
      window.scrollTo(0, scrollHeight)
      // anime
      this.$anime({
        targets: [el],
        easing: 'easeInOutSine',
        keyframes,
        direction: 'alternate',
        loop: 4,
        duration: 320
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
    },
    scrollToCommentArea() {
      const scrollHeight =
        document.getElementById('scroll-mark').getBoundingClientRect().top +
        window.scrollY -
        200
      window.scrollTo(0, scrollHeight)
    },
    onSubmitComment() {
      console.log(this.newComment)
    },
    reply(id, username) {
      this.newComment.replyCommentId = id
      this.newComment.replyUsername = username
      document.getElementById('comment-content-textarea').focus()
      this.scrollToCommentArea()
    },
    replyAlertDismissed() {
      this.newComment.replyCommentId = null
      this.newComment.replyUsername = null
    },
    like(id) {
      console.log(`like comment : %c ${id}`, 'color:#f00;')
    },
    dislike(id) {
      console.log(`dislike comment : %c ${id}`, 'color:#f0f;')
    }
  }
}
</script>

<style scoped lang="scss">
.comment-amount {
  font-size: 0.8rem;
  vertical-align: middle;
}

.comment-main {
  min-height: 48px;
}

.comment-header {
  position: relative;

  .comment-user {
    font-weight: bold;
  }

  .comment-time {
    color: map-get($grey, lighten-4);
  }

  .reply-popup {
    background-color: $gray-100;
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
    font-size: 0.8rem;
    font-weight: 500;
  }
}

.comment-footer {
  color: $gray-600;

  .comment-like,
  .comment-dislike {
    display: inline-block;
    min-width: 3.5rem;

    .comment-btn {
      cursor: pointer;
      vertical-align: middle;
    }

    .number {
      vertical-align: middle;
      font-size: 0.8rem;
      line-height: 1.5rem;
      height: 1.5rem;
      display: inline-block;
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

.more-comments {
  cursor: pointer;
  font-weight: 500;
  color: $gray-600;

  &:hover {
    color: $blue;
  }
}

.comment-input-icon {
  position: absolute;
  height: calc(100% - 2px);
}

.comment-input {
  border: none;
  border-bottom: 2px solid $gray-500;
  border-radius: 0;
  overflow-y: auto !important;

  .comment-input-border {
    height: 2px;
    width: 0;
    max-width: 100%;
    background: #000;
    position: relative;
    top: -2px;
    margin: 0 auto;
    transition: width 0.35s ease-in-out;
  }

  &:focus {
    box-shadow: none;

    & + .comment-input-border {
      width: 100%;
    }
  }
}

textarea.comment-input {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: $gray-200;
  }

  &::-webkit-scrollbar-thumb {
    background: $gray-500;
  }

  &::-webkit-scrollbar-track:hover {
    background: $gray-300;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $gray-600;
  }
}

#reply-mark {
  display: inline-block;
  padding: 6px 40px 6px 10px;
  ::v-deep .close {
    padding: 6px 10px;
  }
}
</style>
