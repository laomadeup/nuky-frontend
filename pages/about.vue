<template>
  <client-only>
    <nuky-editor />
  </client-only>
</template>

<script>
import NukyEditor from '@/components/NukyEditor'

export default {
  layout: 'AppBlog',
  components: {
    NukyEditor
  },
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
