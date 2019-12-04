<template>
  <client-only><nuky-editor v-model="content"/></client-only>
</template>

<script>
export default {
  layout: 'AppBlog',
  data() {
    return { content: null }
  }
}
</script>

<style scoped></style>
