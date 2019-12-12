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
        <span class="comment-user mr-2">
          {{ comment.user.username }}
        </span>
        <span class="comment-time">
          <fa-icon :icon="['far', 'clock']" size="xs" />
          <span>
            {{ $moment(comment.createDate).fromNow() }}
          </span>
        </span>
        <section class="mb-0">
          <div class="reply-comment">
            <a
              v-if="comment.replyToComment"
              class="reply-link"
              :href="'#comment-' + comment.replyToComment.id"
              @click="commentHint(comment.replyToComment.id)"
            >
              @{{ comment.replyToComment.username }} :
            </a>
            {{ comment.content }}
            <div v-if="comment.replyToComment" class="reply-popup p-2">
              {{ comment.replyToComment.content }}
            </div>
          </div>
        </section>
      </section>
    </b-media>
    <span
      v-show="!isLoddingComents && !(totalPages === pageNumber)"
      class="more-comments mt-1"
      @click="loadComments()"
    >
      <fa-icon class="mr-2" :icon="['fas', 'caret-down']" />
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

  .comment-user {
    font-weight: bold;
  }

  .comment-time {
    color: $gray-800;
  }

  .reply-comment {
    display: inline-block;
    position: relative;

    .reply-popup {
      display: none;
      background: #ffffee;
      border-radius: 5px;
      max-width: 500px;
      border: 1px solid #aaa;
      position: absolute;
      top: 30px;
      left: 0;
    }

    .reply-link:hover + .reply-popup {
      display: block;
    }
  }
}

.more-comments {
  @include link();
}

.more-comments::after {
  content: ' More Comments';
}
</style>
