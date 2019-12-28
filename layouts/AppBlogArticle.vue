<template>
  <v-app>
    <banner />
    <app-nav-drawer />
    <v-content>
      <div
        class="app-container ma-auto py-2 py-sm-5 py-md-10 px-5 px-sm-10 px-md-10 px-lg-0"
      >
        <v-row>
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
          <v-col md="4" class="hidden-sm-and-down">
            <v-divider vertical class="float-left" />
            <app-aside class="pl-5" />
          </v-col>
        </v-row>
      </div>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import Banner from '@/components/blog/public/Banner'
import NavDrawer from '@/components/blog/public/NavDrawer'
import Aside from '@/components/blog/public/Aside'
import Footer from '@/components/blog/public/Footer'

export default {
  components: {
    Banner,
    appNavDrawer: NavDrawer,
    appFooter: Footer,
    appAside: Aside
  }
}
</script>

<style scoped lang="scss">
.app-container {
  max-width: 1200px !important;
}
</style>
