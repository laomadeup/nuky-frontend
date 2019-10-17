<template>
  <div id="app">
    <div>
      <b-button variant="success">
        <fa-icon :icon="['fab', 'github']"/>
        Button
      </b-button>
      <b-button variant="danger" size="lg">
        <fa-icon :icon="['fab', 'github']" size="lg"/>
        Button
      </b-button>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {}
</script>

<style lang="stylus">
</style>
