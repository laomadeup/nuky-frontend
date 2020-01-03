<template>
  <v-app>
    <banner />
    <app-nav-drawer />
    <v-content>
      <slot name="content">
        <nuxt />
      </slot>
    </v-content>
    <app-footer />
  </v-app>
</template>

<script>
import Banner from '@/components/blog/public/Banner'
import NavDrawer from '@/components/blog/public/NavDrawer'
import Footer from '@/components/blog/public/Footer'

export default {
  name: 'Blog',
  components: {
    Banner,
    appNavDrawer: NavDrawer,
    appFooter: Footer
  }
}
</script>
