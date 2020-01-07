<template>
  <div>
    <!-- comment addition area -->
    <div class="mt-5">
      <h2 id="scroll-mark" class="headline">
        <v-icon color="grey" large>{{ mdiDraw }}</v-icon>
        Add a Comment
      </h2>
      <v-container class="px-0">
        <v-form
          id="comment-form"
          ref="form"
          v-model="newComment.valid"
          class="px-4"
          @submit.prevent="submitComment"
        >
          <v-row class="mb-2">
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-chip
                  v-show="showReplyChip"
                  small
                  color="info"
                  close
                  @click:close="replyAlertDismissed"
                  @click="commentHint(newComment.replyCommentId)"
                  v-on="on"
                >
                  <v-icon small>{{ mdiAt }}</v-icon>
                  {{ newComment.replyUsername }}
                </v-chip>
              </template>
              <span>replying</span>
            </v-tooltip>
          </v-row>
          <v-row class="mb-2">
            <v-textarea
              id="comment-content-textarea"
              v-model="newComment.content"
              label="Enter your comment..."
              rows="1"
              auto-grow
              clearable
              :counter="500"
              :rules="[inputRules.required, inputRules.maxCharacters(500)]"
            >
              <template v-slot:prepend-inner>
                <v-icon>{{ mdiCommentTextOutline }}</v-icon>
              </template>
            </v-textarea>
          </v-row>
          <v-row class="mb-2">
            <v-text-field
              v-model="newComment.username"
              :rules="[inputRules.required, inputRules.maxCharacters(20)]"
              label="Enter your name..."
              clearable
              :counter="20"
            >
              <template v-slot:prepend-inner>
                <v-icon>{{ mdiCommentAccountOutline }}</v-icon>
              </template>
            </v-text-field>
          </v-row>
          <v-row justify="end" class="mt-2">
            <v-btn
              form="comment-form"
              type="submit"
              :disabled="!newComment.valid"
              depressed
              class="primary grey--text text--lighten-5"
            >
              COMMENT
            </v-btn>
          </v-row>
        </v-form>
      </v-container>
    </div>

    <!-- Comments -->
    <div class="mt-5">
      <v-badge color="info" :content="commentAmount">
        <h2 class="headline mb-4">
          <v-icon color="grey darken-1" large
            >{{ mdiCommentTextMultipleOutline }}
          </v-icon>
          Comments
        </h2>
      </v-badge>

      <div v-if="comments.length === 0">No one commented yet</div>
      <v-container class="py-0">
        <v-row
          v-for="comment in comments"
          :id="`comment-${comment.id}`"
          :key="comment.id"
          class="flex-nowrap mb-4"
        >
          <v-avatar width="48" class="mr-4" :color="comment.user.avatar">
            <v-icon dark>{{ mdiAccountCircle }}</v-icon>
          </v-avatar>
          <section class="comment-main">
            <section class="comment-header">
              <span class="font-weight-medium mr-2">
                {{ comment.user.username }}
              </span>
              <span>
                <v-icon small>{{ mdiClock }}</v-icon>
                <span class="body-2 verticalalign-bottom">
                  {{ $moment(comment.createDate).fromNow() }}
                </span>
              </span>
            </section>
            <section>
              <p class="mb-1">
                <span v-if="comment.replyComment" class="reply-block">
                  <v-chip
                    x-small
                    class="app-chip verticalalign-text-top"
                    color="primary"
                    @click="commentHint(comment.replyComment.id)"
                  >
                    <v-icon small>{{ mdiAt }}</v-icon>
                    {{ comment.replyComment.username }}
                  </v-chip>
                  <span
                    v-if="comment.replyComment"
                    class="reply-popup blue-grey lighten-4 py-2 px-4"
                  >
                    {{ comment.replyComment.content }}
                  </span>
                </span>
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
                        <v-icon small>{{ mdiThumbUp }}</v-icon>
                      </v-btn>
                    </template>
                    <span>like</span>
                  </v-tooltip>
                </span>
                <span
                  v-show="comment.like > 0"
                  class="caption"
                  v-text="formatWithSIPrefix(comment.like)"
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
                        <v-icon small>{{ mdiThumbDown }}</v-icon>
                      </v-btn>
                    </template>
                    <span>dislike</span>
                  </v-tooltip>
                </span>
                <span
                  v-show="comment.dislike > 0"
                  class="caption"
                  v-text="formatWithSIPrefix(comment.dislike)"
                />
              </section>
              <section class="d-inline-block ml-2 mr-4">
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
            </section>
          </section>
        </v-row>
      </v-container>
      <v-btn
        v-show="!isLoddingComents && !(totalPages === pageNumber)"
        text
        depressed
        class="more-comments text-capitalize"
        @click="loadComments()"
      >
        <v-icon>{{ mdiMenuDown }}</v-icon>
        More Comments
      </v-btn>
      <div v-show="isLoddingComents" class="text-center">
        <v-progress-circular indeterminate color="primary" />
      </div>
    </div>
  </div>
</template>

<script>
import { formatPrefix } from 'd3-format'
import anime from 'animejs/lib/anime.es.js'
import {
  mdiDraw,
  mdiAt,
  mdiCommentTextOutline,
  mdiCommentAccountOutline,
  mdiCommentTextMultipleOutline,
  mdiAccountCircle,
  mdiClock,
  mdiThumbUp,
  mdiThumbDown,
  mdiMenuDown
} from '@mdi/js'
import { required, maxCharacters } from '@/assets/utils/validation-rules'
const keyframes = (() => {
  const fr = []
  for (let i = 0; i <= 10; i++) {
    fr.push({ opacity: 1 - i / 10 })
  }
  return fr
})()

export default {
  name: 'ArticleComment',
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
      mdiDraw,
      mdiAt,
      mdiCommentTextOutline,
      mdiCommentAccountOutline,
      mdiCommentTextMultipleOutline,
      mdiAccountCircle,
      mdiClock,
      mdiThumbUp,
      mdiThumbDown,
      mdiMenuDown,
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
        valid: false,
        username: null,
        replyCommentId: null,
        replyUsername: null,
        content: ''
      },
      inputRules: {
        required,
        maxCharacters
      }
    }
  },
  computed: {
    showReplyChip() {
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
    formatWithSIPrefix(number) {
      return formatPrefix('.1~', number)(number)
    },
    commentHint(id) {
      // scroll to target
      this.$vuetify.goTo(`#comment-${id}`, this.scrollOptions).then(function() {
        // anime
        anime({
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
    submitComment() {
      if (this.$refs.form.validate()) {
        console.log(`submit comment =>`)
        console.log(
          `replyCommentId\t : %c ${this.newComment.replyCommentId}`,
          'color:#1A237E;'
        )
        console.log(
          `content\t\t\t : %c ${this.newComment.content}`,
          'color:#00695C;'
        )
        console.log(
          `replyUsername\t : %c ${this.newComment.username}`,
          'color:#9E9D24;'
        )
      }
    },
    reply(id, username) {
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

.reply-block {
  position: relative;
  display: inline-block;
  line-height: 0;

  .reply-popup {
    line-height: 20px;
    border-radius: 5px;
    width: max-content;
    max-width: 500px;
    border: 1px solid map-get($blue-grey, lighten-3) !important;
    position: absolute;
    bottom: 24px;
    left: 0;
    visibility: hidden;
    display: block;
    opacity: 0;
    transition: opacity 0.3s;
  }

  &:hover {
    .reply-popup {
      visibility: visible;
      opacity: 1;
    }
  }
}

.comment-footer {
  .thumb-number {
    min-width: 4.4rem;
  }
}

.comment-input-icon {
  position: absolute;
  height: calc(100% - 2px);
}
</style>
