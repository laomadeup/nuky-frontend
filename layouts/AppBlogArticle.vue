<template>
  <v-app>
    <app-header-nav />
    <v-content>
      <nuxt />
      <article-aside />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
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
