<template>
  <v-app>
    <app-header-nav />
    <v-content>
      <nuxt />
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import Navbar from '@/components/blog/Navbar'
import Footer from '@/components/blog/Footer'

export default {
  components: {
    appHeaderNav: Navbar,
    appFooter: Footer
  }
}
</script>
