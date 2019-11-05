<template>
  <b-row>
    <b-col :lg="12" :xl="8" class="divider">
      <article v-for="(article, index) in articles" :key="index">
        <header>
          <h3>{{ article.title }}</h3>
          <p>
            <fa-icon class="text-info" :icon="['far', 'clock']" />&nbsp;
            <time>{{ new Date(article.postDate).toLocaleString() }}</time>
          </p>
        </header>
        <p>
          {{ article.content }}
        </p>
      </article>
    </b-col>
    <b-col :lg="12" :xl="4">
      <div>
        <span>POPULAR</span>
      </div>
      <div>
        <span>CATEGORIES</span>
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  layout: 'blog',
  data() {
    return {
      articles: []
    }
  },
  async asyncData({ $axios }) {
    const { data: articles } = await $axios.get(
      '/api/article-api/article/index'
    )
    return { articles }
  }
}
</script>

<style scoped lang="stylus">
.divider
  border-right 1px solid #cccccc

@media (max-width: 1200px)
  .divider
    border-right none
    border-bottom 1px solid #cccccc
    margin-bottom 20px
</style>
