<template>
  <v-app>
    <app-header-nav>
      <template v-slot:rightNavDrawer="slotProps">
        <v-navigation-drawer
          v-model="slotProps.rightDrawer"
          color="grey lighten-4"
          right
          app
          clipped
          width="500"
        >
          <article-aside class="pt-5 pl-5" />
        </v-navigation-drawer>
      </template>
    </app-header-nav>
    <v-content>
      <nuxt class="app-content pa-5" />
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
.app-content {
  height: calc(100vh - 98px);
  overflow-y: auto;
}
</style>
