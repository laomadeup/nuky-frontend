<template>
  <div>
    <b-row>
      <b-col :lg="12" :xl="8" class="divider">
        <article v-for="(article, index) in articles" :key="index">
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
                <h5>author：{{ comment.user.name }}</h5>
                <p>{{ new Date(comment.createDate).toLocaleString() }}</p>
              </header>
              <p>{{ comment.content }}</p>
            </article>
          </section>
        </article>
      </b-col>
      <b-col :lg="12" :xl="4">
        <div>
          <span>侧栏</span>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  layout: 'blog'
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
