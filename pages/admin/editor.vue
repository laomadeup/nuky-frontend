<template>
  <div>
    <client-only placeholder="Loading Editor ...">
      <nuky-editor v-model="content" />
    </client-only>
  </div>
</template>

<script>
import NukyEditor from '@/components/admin/public/NukyEditor'

export default {
  layout: 'Admin',
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
