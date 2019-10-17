<template>
  <div id="app">
    <el-container>
      <el-header class="hidden-xs-only">
        <div class="app-header">
          <app-header-menu></app-header-menu>
        </div>
      </el-header>
      <el-row>
        <el-col :xs="4" :sm="0">
          <el-aside class="hidden-sm-and-up">
            <app-aside-menu></app-aside-menu>
          </el-aside>
        </el-col>
        <el-col :xs="20" :sm="24">
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
        </el-col>
      </el-row>
    </el-container>
  </div>
</template>
<script>
import HeaderMenu from '@/components/HeaderMenu'
import AsideMenu from '@/components/AsideMenu'
import Main from '@/components/Main'
import Footer from '@/components/Footer'
import '@/assets/icon/iconfont.css'
import 'element-ui/lib/theme-chalk/display.css'

export default {
  components: {
    appHeaderMenu: HeaderMenu,
    appAsideMenu: AsideMenu,
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
  height calc(100vh - 60px)
  max-width 1200px
  margin 0 auto

.el-scrollbar .el-scrollbar__wrap
  overflow-x: auto

.el-menu--collapse {
  height: 100vh;
}
</style>
