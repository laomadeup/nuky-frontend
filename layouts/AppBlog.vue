<template>
  <v-app>
    <app-nav-drawer />
    <v-content>
      <nuxt class="pa-4" />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import NavDrawer from '@/components/blog/NavDrawer'
import Footer from '@/components/blog/Footer'

export default {
  components: {
    appNavDrawer: NavDrawer,
    appFooter: Footer
  }
}
</script>
