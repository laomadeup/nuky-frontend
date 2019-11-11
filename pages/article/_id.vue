<template>
  <div>
    <div v-if="article.id == null">Article Not Found</div>
    <article v-else>
      <header>
        <h4>{{ article.title }}</h4>
        <p>
          <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
          <time>{{ new Date(article.postDate).toLocaleString() }}</time>
        </p>
      </header>
      <p>
        {{ article.content }}
      </p>
      <section>
        <br />
        <h4><fa-icon :icon="['fas', 'comment-dots']" />&nbsp; Comments</h4>
        <article v-for="(comment, idx) in article.comments" :key="idx">
          <header>
            <h5>author：{{ comment.user.username }}</h5>
            <p>{{ new Date(comment.createDate).toLocaleString() }}</p>
          </header>
          <p>{{ comment.content }}</p>
        </article>
      </section>
    </article>
  </div>
</template>

<script>
export default {
  layout: 'AppBlogArticle',
  data() {
    return {
      article: null
    }
  },
  async asyncData({ $axios, params }) {
    const { data: article } = await $axios.get(
      '/api/article-api/article/' + params.id
    )
    return { article }
  },
  validate({ params }) {
    // params.id must be number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
