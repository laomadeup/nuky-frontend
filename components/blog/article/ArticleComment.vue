<template>
  <div>
    <div class="mt-5">
      <h2 id="scroll-mark" class="headline">
        <v-icon color="primary" large>mdi-message-draw</v-icon>
        Add a Comment
      </h2>
      <v-container>
        <v-form @submit.prevent="onSubmitComment">
          <v-row>
            <v-col class="mb-2">
              <v-alert
                id="reply-mark"
                dense
                :show="showReplyAlert"
                dismissible
                fade
                @dismissed="replyAlertDismissed"
              >
                <v-chip x-small color="red" text-color="white" link
                  >Replying
                </v-chip>
                <v-chip
                  color="blue"
                  x-small
                  @click="commentHint(newComment.replyCommentId)"
                  >@{{ newComment.replyUsername }}
                </v-chip>
              </v-alert>
              <v-textarea
                id="comment-content-textarea"
                v-model="newComment.content"
                placeholder="Enter your comment..."
                max-rows="10"
                required
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col md="8" sm="12" class="mb-2">
              <v-icon>mdi-account-card-details-outline</v-icon>
              <v-text-field
                v-model="newComment.username"
                label="Filled"
                placeholder="Enter your name..."
                filled
              />
            </v-col>
            <v-col md="4" sm="12">
              <v-btn block type="submit" variant="info">
                SUBMIT
                <v-icon>mdi-feather</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </div>

    <!-- Comments -->
    <div class="mt-5">
      <v-badge color="red">
        <template v-slot:badge>
          <span>{{ commentAmount }}</span>
        </template>
        <h2 class="headline mb-4">
          <v-icon color="primary" large>mdi-comment-text-multiple</v-icon>
          Comments
        </h2>
      </v-badge>

      <div v-if="comments.length === 0">No one commented yet</div>
      <v-container class="py-0">
        <v-row
          v-for="comment in comments"
          :id="`comment-${comment.id}`"
          :key="comment.id"
          class="mb-2"
        >
          <v-col cols="2" sm="1" class="pa-0">
            <v-avatar width="48" :color="comment.user.avatar">
              <v-icon dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col cols="10" sm="11" class="pa-0">
            <section class="comment-main mb-2">
              <section class="comment-header">
                <span
                  v-if="comment.replyComment"
                  class="reply-popup blue-grey lighten-5 hide py-2 px-4"
                >
                  {{ comment.replyComment.content }}
                </span>
                <span class="font-weight-medium mr-2">
                  {{ comment.user.username }}
                </span>
              </section>
              <section>
                <p class="mb-1">
                  <v-chip
                    v-if="comment.replyComment"
                    small
                    class="app-chip verticalalign-text-top"
                    color="primary"
                    @click="commentHint(comment.replyComment.id)"
                    @mouseenter="showPopup(comment.id)"
                    @mouseout="hidePopup(comment.id)"
                  >
                    <v-icon x-small>mdi-at</v-icon>
                    {{ comment.replyComment.username }}
                  </v-chip>
                  {{ comment.content }}
                </p>
              </section>
              <section
                class="d-inline-block comment-footer grey--text text--darken-1"
              >
                <section class="d-inline-block thumb-number">
                  <span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          text
                          icon
                          small
                          dark
                          color="blue lighten-1"
                          v-on="on"
                          @click="like(comment.id)"
                        >
                          <v-icon small>mdi-thumb-up</v-icon>
                        </v-btn>
                      </template>
                      <span>like</span>
                    </v-tooltip>
                  </span>
                  <span
                    v-show="comment.like > 0"
                    class="caption"
                    v-text="formatNumber(comment.like)"
                  />
                </section>
                <section class="d-inline-block thumb-number">
                  <span>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                          text
                          icon
                          small
                          dark
                          color="red lighten-1"
                          @click="dislike(comment.id)"
                          v-on="on"
                        >
                          <v-icon small>mdi-thumb-down</v-icon>
                        </v-btn>
                      </template>
                      <span>dislike</span>
                    </v-tooltip>
                  </span>
                  <span
                    v-show="comment.dislike > 0"
                    class="caption"
                    v-text="formatNumber(comment.dislike)"
                  />
                </section>
                <section class="d-inline-block mx-2">
                  <v-btn
                    dark
                    text
                    x-small
                    color="grey darken-1"
                    class="body-2 font-weight-medium"
                    @click="reply(comment.id, comment.user.username)"
                    >REPLY</v-btn
                  >
                </section>
                <section class="d-inline-block">
                  <v-icon small class="verticalalign-text-bottom"
                    >mdi-clock</v-icon
                  >
                  <span class="body-2 verticalalign-bottom">
                    {{ $moment(comment.createDate).fromNow() }}
                  </span>
                </section>
              </section>
            </section>
          </v-col>
        </v-row>
      </v-container>
      <span
        v-show="!isLoddingComents && !(totalPages === pageNumber)"
        class="more-comments mt-1"
        @click="loadComments()"
      >
        <v-icon>mdi-menu-down</v-icon>
        More Comments
      </span>
      <div v-show="isLoddingComents" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'd3-format'

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
      scrollOptions: {
        duration: 500,
        easing: 'linear',
        offset: 100
      },
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
    formatNumber(number) {
      return format('.2~s')(number)
    },
    commentHint(id) {
      // scroll to target
      const $$anime = this.$anime
      this.$vuetify.goTo(`#comment-${id}`, this.scrollOptions).then(function() {
        // anime
        $$anime({
          targets: [document.querySelector(`#comment-${id}`)],
          easing: 'easeInOutSine',
          keyframes,
          direction: 'alternate',
          loop: 4,
          duration: 320,
          complete() {
            document.querySelector(`#comment-${id}`).style.opacity = 1
          }
        })
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
    onSubmitComment() {
      console.log(this.newComment)
    },
    reply(id, username) {
      this.$vuetify.goTo('#scroll-mark', this.scrollOptions)
      this.newComment.replyCommentId = id
      this.newComment.replyUsername = username
      document.getElementById('comment-content-textarea').focus()
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
@import '~vuetify/src/styles/styles';

.comment-main {
  min-height: 48px;
}

.comment-header {
  position: relative;

  .reply-popup {
    opacity: 0;
    border-radius: 5px;
    max-width: 500px;
    border: 1px solid map-get($blue-grey, lighten-3) !important;
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;

    &.hide {
      display: none;
    }
  }
}

.comment-footer {
  .thumb-number {
    min-width: 3.6rem;
  }
}

.more-comments {
  cursor: pointer;
  font-weight: 500;
  color: map-get($grey, darken-3);

  &:hover {
    color: var(---info-base);
  }
}

.comment-input-icon {
  position: absolute;
  height: calc(100% - 2px);
}

textarea.comment-input {
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: map-get($grey, darken-1);
  }

  &::-webkit-scrollbar-thumb {
    background: map-get($grey, darken-3);
  }

  &::-webkit-scrollbar-track:hover {
    background: map-get($grey, darken-2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: map-get($grey, darken-4);
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
