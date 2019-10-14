<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="1">Home</el-menu-item>
    <el-menu-item index="2">Articles</el-menu-item>
    <el-menu-item index="3">Github</el-menu-item>
    <el-menu-item index="4">About Me</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      activeIndex: '1'
    }
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
