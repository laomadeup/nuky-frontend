<template>
  <b-pagination-nav
    :number-of-pages="totalPages"
    :link-gen="linkGen"
    :value="pageNumber"
    align="center"
  ></b-pagination-nav>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    totalPages() {
      return this.$store.state.pagination.totalPages
    },
    pageNumber() {
      return this.$store.state.pagination.pageNumber
    }
  },
  methods: {
    linkGen(pageNumber) {
      return {
        name: 'articles-page-number',
        params: { number: pageNumber }
      }
    }
  }
}
</script>

<style scoped></style>
