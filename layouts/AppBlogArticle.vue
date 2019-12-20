<template>
  <v-app>
    <app-header-nav />
    <v-content>
      <v-container class="app-container px-xl-12 px-lg-8 px-4">
        <v-row>
          <v-col sx="12" md="8">
            <nuxt />
          </v-col>
          <v-col md="4" class="hidden-sm-and-down">
            <v-divider vertical class="float-left" />
            <article-aside class="pl-5" />
          </v-col>
        </v-row>
      </v-container>
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

<style scoped lang="scss">
.app-container {
  max-width: 100%;
}
</style>
