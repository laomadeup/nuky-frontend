<template>
  <b-row>
    <b-col :lg="12" :xl="8" class="divider">
      <article>
        <header>
          <h3>article元素使用方法</h3>
          <p>
            <fa-icon :icon="['fas', 'calendar-alt']"></fa-icon>
             发表日期：
            <time pubdate="pubdate">2017/2/9</time>
          </p>
        </header>
        <p>此标签里显示的是article整个文章的主要内容，，下面的section元素里是对该文章的评论</p>
        <section>
          <h3>评论</h3>
          <article>
            <header>
              <h5>发表者：Galin</h5>
              <p>1小时前</p>
            </header>
            <p>这篇文章很不错啊，顶一下！</p>
          </article>
          <article>
            <header>
              <h5>发表者：木木</h5>
              <p>1小时前</p>
            </header>
            <p>这篇文章很不错啊，对article解释的很详细</p>
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
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="stylus">
.divider
  border-right 1px solid #CCC

@media (max-width: 1200px)
  .divider
    border-right none
    border-bottom 1px solid #CCC
    margin-bottom 20px

</style>
