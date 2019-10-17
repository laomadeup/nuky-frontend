<template>
  <el-menu router :default-active="this.$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="/">Home</el-menu-item>
    <el-menu-item index="/articles">Articles</el-menu-item>
    <el-menu-item index="/github">Github</el-menu-item>
    <el-menu-item index="/about">About Me</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'HeaderMenu',
  data () {
    return {}
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
