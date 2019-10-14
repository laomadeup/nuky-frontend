<template>
  <div id="app">
    <el-container>
      <el-header>
        <app-header></app-header>
      </el-header>
      <el-main>
        <app-main></app-main>
      </el-main>
      <el-footer>
        <app-footer></app-footer>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
import Header from './components/Header'
import Main from './components/Main'
import Footer from './components/Footer'

export default {
  components: {
    appHeader: Header,
    appMain: Main,
    appFooter: Footer
  }
}
</script>
<style lang="stylus">
#app
  max-width 1200px
  margin 0 auto
</style>
