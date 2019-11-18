<template>
  <div>
    <div v-if="articles.length === 0">
      Nothing here...
      <br />
      <nuxt-link :to="{ name: 'index' }">back to home page>></nuxt-link>
    </div>
    <div v-else>
      <article
        v-for="(article, index) in articles"
        :key="index"
        ref="articleBox"
        class="article-page-item"
        :index="index"
      >
        <header>
          <nuxt-link
            class="link-title"
            tag="h4"
            :to="{ name: 'article-id', params: { id: article.id } }"
          >
            {{ article.title }}
          </nuxt-link>
          <p>
            <fa-icon :icon="['fas', 'calendar-alt']" />&nbsp;
            <time>
              {{ $moment(article.postDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </p>
        </header>
        <div class="article-body">
          <div>{{ article.content }}</div>
        </div>
        <nuxt-link
          v-show="article.showMore"
          class="article-show-all"
          tag="div"
          :to="{ name: 'article-id', params: { id: article.id } }"
        >
        </nuxt-link>
      </article>
      <b-pagination-nav
        :number-of-pages="totalPages"
        :link-gen="linkGen"
        :value="pageNumber"
        align="center"
      ></b-pagination-nav>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppBlogArticle',
  data() {
    return {
      pageNumber: 0,
      totalPages: 0,
      articles: []
    }
  },
  async asyncData({ params, store, $axios }) {
    // paged query ariticle list
    const pageNumber = params.number ? params.number : 1
    const { content, totalPages, pageable } = await $axios.$get(
      `/api/article-api/articles/page/${pageNumber}`
    )
    for (const item of content) {
      item.showMore = false
    }
    return {
      articles: content,
      totalPages,
      pageNumber: pageable.pageNumber + 1
    }
  },
  mounted() {
    const articleBoxes = this.$refs.articleBox
    for (const articleBox of articleBoxes) {
      this.articles[articleBox.getAttribute('index')].showMore =
        articleBox.querySelector('.article-body').children[0].clientHeight >
        articleBox.querySelector('.article-body').clientHeight
    }
  },
  methods: {
    linkGen(pageNumber) {
      return {
        name: 'articles-page-number',
        params: { number: pageNumber }
      }
    }
  }
}
</script>

<style scoped lang="stylus">
@import "~assets/style/common/colors"
@import "~assets/style/common/public"

.article-page-item
  margin-bottom 30px
  border-bottom 1px solid $border-color-gray
  padding-bottom 20px

.article-body
  max-height 12.2rem
  overflow hidden

.article-show-all
  text-align center
  height 2rem
  line-height 2rem
  link()
  link-hover()
  &:hover
    background-color #CCCCCC33
  &::before
    content '--- SHOW MORE ---'

.link-title
  link-hover()
</style>
