<template>

  <!--<el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收起</el-radio-button>
  </el-radio-group>-->
  <el-menu router default-active="/" :collapse="isCollapse">
    <el-menu-item index="/">
      <i class="el-icon-house"></i>
      <span slot="title">Home</span>
    </el-menu-item>
    <el-menu-item index="/articles">
      <i class="el-icon-document"></i>
      <span slot="title">Articles</span>
    </el-menu-item>
    <el-menu-item index="/github">
      <i class="el-icon-kyun-github"></i>
      <span slot="title">Github</span>
    </el-menu-item>
    <el-menu-item index="/about">
      <i class="el-icon-user"></i>
      <span slot="title">About Me</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'AsideMenu',
  data () {
    return {
      isCollapse: true
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
