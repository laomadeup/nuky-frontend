<template>
  <v-app>
    <banner />
    <app-nav-drawer />
    <v-content>
      <div
        class="app-container ma-auto py-2 py-sm-5 py-md-10 px-5 px-sm-10 px-md-10 px-lg-0"
      >
        <slot name="content">
          <div class="content mx-auto">
            <nuxt />
          </div>
        </slot>
      </div>
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
    appFooter: Footer,
  },
}
</script>

<style scoped lang="scss">
.app-container {
  max-width: 1200px !important;
}

.content {
  max-width: 1000px;
}
</style>
