<template>
  <div>
    <app-header-nav />
    <nuxt />
    <app-footer />
  </div>
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
