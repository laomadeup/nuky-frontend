<template>
  <div>
    <app-header-nav />
    <app-body />
    <app-footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import HeaderNav from '@/components/HeaderNav'
import MainBody from '@/components/MainBody'
import Footer from '@/components/Footer'

export default {
  components: {
    appHeaderNav: HeaderNav,
    appBody: MainBody,
    appFooter: Footer
  }
}
</script>

<style lang="stylus"></style>
