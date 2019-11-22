<template>
  <div>
    <app-header-nav />
    <b-container>
      <b-row>
        <b-col :md="12" :lg="7" :xl="8">
          <nuxt />
        </b-col>
        <b-col :md="12" :lg="5" :xl="4" class="divider">
          <article-aside />
        </b-col>
      </b-row>
    </b-container>
    <app-footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from '@/components/blog/Navbar'
import Footer from '@/components/blog/Footer'
import ArticleAside from '@/components/blog/ArticleAside'

export default {
  components: {
    appHeaderNav: Navbar,
    appFooter: Footer,
    ArticleAside
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/public';

.divider {
  border-left: 1px solid $gray-300;
  padding-left: 20px;
  margin-bottom: 50px;
}

@media (max-width: 992px) {
  .divider {
    display: none;
  }
}
</style>
