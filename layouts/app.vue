<template>
  <div>
    <app-header-nav />
    <b-container class="app-main-container">
      <nuxt />
    </b-container>
    <app-footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HeaderNav from '@/components/HeaderNav'
import Footer from '@/components/Footer'

export default {
  components: {
    appHeaderNav: HeaderNav,
    appFooter: Footer
  }
}
</script>

<style lang="stylus">
.app-main-container
  min-height calc(100vh - 196px)
</style>
