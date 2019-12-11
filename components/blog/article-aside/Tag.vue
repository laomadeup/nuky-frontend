<template>
  <div>
    <h5>
      <fa-icon class="text-info" :icon="['fas', 'tags']" />
      Tags
    </h5>
    <div class="p-2 content-area">
      <tag-badge :tags="tags" />
    </div>
  </div>
</template>

<script>
import TagBadge from '@/components/blog/public/TagBadge'

export default {
  name: 'Tag',
  components: { TagBadge },
  data() {
    return { tags: this.$store.state.article.tags }
  }
}
</script>

<style scoped lang="scss"></style>
