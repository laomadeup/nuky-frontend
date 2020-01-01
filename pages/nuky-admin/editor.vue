<template>
  <div>
    <client-only>
      <nuky-editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import NukyEditor from '@/components/NukyEditor'

export default {
  layout: 'empty',
  components: { NukyEditor },
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
