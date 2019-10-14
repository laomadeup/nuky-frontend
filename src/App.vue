<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="app-header">
          <app-header></app-header>
        </div>
      </el-header>
      <el-scrollbar style="height: 100%">
        <div class="app-main">
          <el-main>
            <app-main></app-main>
          </el-main>
          <el-footer>
            <app-footer></app-footer>
          </el-footer>
        </div>
      </el-scrollbar>
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
body
  overflow hidden

.app-header
  max-width 1200px
  margin 0 auto

.app-main
  height 94.5vh
  max-width 1200px
  margin 0 auto

.el-scrollbar .el-scrollbar__wrap
  overflow-x: auto
</style>
