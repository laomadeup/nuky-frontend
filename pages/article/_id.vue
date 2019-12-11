<template>
  <div>
    <div v-if="article.id == null">Article Not Found</div>
    <div v-else>
      <article>
        <header>
          <h3>{{ article.title }}</h3>
          <article-info :tags="article.tags" :category="article.category" />
          <section>
            <p>
              <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
              <time>
                {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
              </time>
            </p>
          </section>
        </header>
        <article-content :content="article.content" />
      </article>
      <div class="divider mt-5 mb-5 ml-3 mr-3">
        <span class="pl-4 pr-4">END</span>
      </div>
      <article-comment
        :article-id="article.id"
        :comment-amount="article.commentAmount"
      />
    </div>
  </div>
</template>

<script>
import ArticleComment from '@/components/blog/article/ArticleComment'
import ArticleContent from '@/components/blog/article/ArticleContent'
import ArticleInfo from '@/components/blog/article/ArticleInfo'

export default {
  layout: 'AppBlogArticle',
  components: {
    ArticleComment,
    ArticleContent,
    ArticleInfo
  },
  async asyncData({ params, store, $axios }) {
    const data = await $axios.$get(`/api/article-api/article/${params.id}`)
    return { article: data }
  },
  data() {
    return {
      article: null
    }
  },
  validate({ params }) {
    // params.id must be number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped lang="scss">
.divider {
  height: 0;
  border-top: 1px solid #cccccc;
  text-align: center;

  span {
    color: #888888;
    position: relative;
    top: -14px;
    background-color: #ffffff;
  }
}
</style>
