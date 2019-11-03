<template>
  <b-container>
    <b-row>
      <b-col> article ID : {{ articleId }}</b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      articleId: null
    }
  },
  beforeMount() {
    this.articleId = this.$route.params.id
  },
  validate({ params }) {
    // params.id must be number
    return /^\d+$/.test(params.id)
  }
}
</script>

<style scoped></style>
