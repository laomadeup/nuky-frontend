<template>
  <div id="app">
    <app-header-menu></app-header-menu>
    <app-body></app-body>
    <app-footer></app-footer>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HeaderMenu from '@/components/HeaderMenu'
import MainBody from '@/components/MainBody'
import Footer from '@/components/Footer'

export default {
  components: {
    appHeaderMenu: HeaderMenu,
    appBody: MainBody,
    appFooter: Footer
  }
}
</script>

<style lang="stylus">
</style>
