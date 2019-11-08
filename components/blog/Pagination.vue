<template>
  <b-pagination-nav
    base-url="/article/page/"
    :number-of-pages="totlePage"
    :link-gen="linkGen"
    align="center"
    aria-controls="my-table"
  ></b-pagination-nav>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return {
      totlePage: 100
    }
  },
  methods: {
    linkGen(pageNum) {
      return `/articles/page/${pageNum}`
    }
  }
}
</script>

<style scoped></style>
