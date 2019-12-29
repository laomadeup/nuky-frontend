<template>
  <div>
    <div v-if="article.id == null">Article Not Found</div>
    <div v-else>
      <article>
        <header class="mb-4">
          <h2>{{ article.title }}</h2>
          <article-info
            class="my-2"
            :tags="article.tags"
            :category="article.category"
          />
          <section>
            <v-icon>mdi-calendar</v-icon>
            <time class="verticalalign-text-top">
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </section>
        </header>
        <article-content :content="article.content" />
      </article>
      <div class="divider my-12 mx-5">
        <span class="px-6">END</span>
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
  async asyncData({ params, $axios }) {
    const data = await $axios.$get(`/api/article-api/article/${params.id}`)
    return { article: data }
  },
  data: () => ({
    article: null
  }),
  head() {
    return {
      title: this.article.title,
      meta: [
        {
          hid: 'Article',
          name: 'Article',
          content: this.article.title
        }
      ]
    }
  },
  // params.id must be number
  validate: ({ params }) => /^\d+$/.test(params.id)
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';
@import '~assets/style/common/main';

.divider {
  height: 0;
  border-top: 1px solid map-get($grey, lighten-2);
  text-align: center;

  span {
    color: map-get($grey, base);
    position: relative;
    top: -14px;
    background-color: map-get($grey, lighten-5);
  }
}
</style>
