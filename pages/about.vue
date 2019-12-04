<template>
  <div>
    <nuky-editor :content="content" />
  </div>
</template>

<script>
export default {
  data() {
    return { content: '<p>Content</p>' }
  }
}
</script>

<style scoped></style>
