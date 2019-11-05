<template>
  <div>
    <app-header-nav />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Navbar from '@/components/blog/Navbar'
import Footer from '@/components/blog/Footer'

export default {
  components: {
    appHeaderNav: Navbar,
    appFooter: Footer
  }
}
</script>

<style lang="stylus"></style>
