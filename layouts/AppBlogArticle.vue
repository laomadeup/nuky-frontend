<template>
  <v-app>
    <app-nav-drawer />
    <v-content>
      <v-container class="app-container">
        <v-row>
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
          <v-col md="4" class="hidden-sm-and-down">
            <v-divider vertical class="float-left" />
            <app-aside class="pl-5" />
          </v-col>
        </v-row>
      </v-container>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import NavDrawer from '@/components/blog/NavDrawer'
import Footer from '@/components/blog/Footer'
import Aside from '@/components/blog/Aside'

export default {
  components: {
    appNavDrawer: NavDrawer,
    appFooter: Footer,
    appAside: Aside
  }
}
</script>

<style scoped lang="scss">
.app-container {
  max-width: 1185px !important;
}
</style>
