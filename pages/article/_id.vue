<template>
  <div>
    <div v-if="article.id == null">Article Not Found</div>
    <div v-else>
      <article>
        <header>
          <h4>{{ article.title }}</h4>
          <p>
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </p>
        </header>
        <p>
          {{ article.content }}
        </p>
      </article>
      <app-comment :article-id="article.id"></app-comment>
    </div>
  </div>
</template>

<script>
import Comment from '@/components/blog/Comment'
export default {
  layout: 'AppBlogArticle',
  components: {
    appComment: Comment
  },
  data() {
    return {
      article: null
    }
  },
  async asyncData({ params, store, $axios }) {
    const data = await $axios.$get(`/api/article-api/article/${params.id}`)
    return { article: data }
  },
  validate({ params }) {
    // params.id must be number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped lang="stylus"></style>
