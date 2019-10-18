<template>
  <footer>
    <b-container>
      <b-row>
        <b-row :lg="12" :xl="8" offset-xl="2"></b-row>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped lang="stylus">
footer
  min-height 100px
  margin-top 20px
  background #dee2e6
</style>
