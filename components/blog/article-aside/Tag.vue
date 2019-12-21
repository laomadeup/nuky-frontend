<template>
  <div>
    <h3>
      <v-icon class="verticalalign-text-bottom" color="light-blue"
        >mdi-tag-multiple</v-icon
      >
      Tags
    </h3>
    <v-divider class="my-2" />
    <div class="p-2 content-area">
      <tag-badge :tags="this.$store.state.article.tags" />
    </div>
    <v-divider class="my-2" />
  </div>
</template>

<script>
import TagBadge from '@/components/blog/public/TagBadge'

export default {
  name: 'Tag',
  components: { TagBadge },
  data() {
    return {}
  }
}
</script>
