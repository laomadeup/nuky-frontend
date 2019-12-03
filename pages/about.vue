<template>
  <div>
    <editor :content="content" />
  </div>
</template>

<script>
import editor from '@/components/editor'

export default {
  components: {
    editor
  },
  data() {
    return { content: '<p>Content</p>' }
  }
}
</script>

<style scoped></style>
