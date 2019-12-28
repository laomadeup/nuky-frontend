<template>
  <header>
    <v-sheet tile color="grey lighten-3">
      <section class="app-banner ma-auto grey--text text--darken-1">
        <h3
          class="hidden-sm-and-down display-1 font-weight-medium py-5 py-xl-8 px-10 px-lg-0"
        >
          Kyun's Blog
        </h3>
        <h3 class="hidden-md-and-up title py-1 py-sm-2 px-5 px-sm-10">
          Kyun's Blog
        </h3>
      </section>
    </v-sheet>
    <v-divider />
  </header>
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style scoped lang="scss">
.app-banner {
  max-width: 1200px;
}
</style>
