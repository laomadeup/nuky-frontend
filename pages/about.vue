<template>
  <client-only placeholder="Loading editor ...">
    <nuky-editor />
  </client-only>
</template>

<script>
export default {
  layout: 'AppBlog',
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'About',
          name: 'About',
          content: 'About'
        }
      ]
    }
  }
}
</script>
