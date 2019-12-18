<template>
  <v-app>
    <app-header-nav />
    <v-content>
      <v-container class="pa-4">
        <v-row>
          <v-col md="12" lg="7" xl="8">
            <nuxt />
          </v-col>
          <v-col md="12" lg="5" xl="4">
            <v-divider vertical class="float-left" />
            <article-aside class="ml-5" />
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
