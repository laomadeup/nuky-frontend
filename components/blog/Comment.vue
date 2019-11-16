<template>
  <section>
    <br />
    <h4><fa-icon :icon="['fas', 'comment-dots']" />&nbsp; Comments</h4>
    <b-card v-for="(comment, cIndex) in comments" :key="cIndex" class="mb-2">
      <b-media>
        <span class="mt-0 comment-user comment-user-main">
          {{ comment.user.username }} :
        </span>
        <p class="ml-4">{{ comment.content }}</p>

        <b-media
          v-for="(ccomment, ccIndex) in comment.comments"
          :key="ccIndex"
          class="ml-4 mt-1"
        >
          <span class="mt-0 comment-user comment-user-minor">
            {{ ccomment.user.username }} :
          </span>
          <p class="ml-4">
            {{ ccomment.content }}
          </p>
        </b-media>
      </b-media>
    </b-card>
  </section>
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
      comments: this.$store.state.comment.comments
    }
  },
  async mounted() {
    await this.$store.dispatch('comment/loadComments', this.articleId)
  }
}
</script>

<style scoped></style>
