<template>
  <div>
    <client-only>
      <nuky-editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
export default {
  layout: 'AppBlog',
  data() {
    return { content: '' }
  },
  head() {
    return {
      title: 'editor',
      meta: [
        {
          hid: 'editor',
          name: 'editor',
          content: 'editor'
        }
      ]
    }
  }
}
</script>
