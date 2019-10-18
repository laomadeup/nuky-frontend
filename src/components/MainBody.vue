<template>
  <b-container>
    <router-view></router-view>
  </b-container>
</template>

<script>
export default {
  name: 'MainBody'
}
</script>

<style scoped lang="stylus">
.container
  min-height calc(100vh - 196px )
</style>
