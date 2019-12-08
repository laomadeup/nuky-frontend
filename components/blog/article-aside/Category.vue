<template>
  <div>
    <h5>
      <fa-icon class="text-success" :icon="['fas', 'tags']" />
      Categories
    </h5>
    <div v-for="category in categories" :key="category.id">
      {{ category.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return { categories: this.$store.state.article.categories }
  }
}
</script>

<style scoped></style>
