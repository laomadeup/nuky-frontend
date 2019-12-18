<template>
  <div>
    <h3>Test</h3>
    <p>Test Test Test Test Test</p>
  </div>
</template>

<script>
export default {
  layout: 'AppBlog',
  data() {
    return {}
  },
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
