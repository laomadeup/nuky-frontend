<template>
  <div>
    <h3>Tags</h3>
    <v-skeleton-loader
      :loading="!this.$store.state.article.tags"
      height="100"
      type="list-item-two-line"
    >
      <v-divider class="my-2" />
      <div class="p-2 content-area">
        <tag-badge :tags="this.$store.state.article.tags" />
      </div>
      <v-divider class="my-2" />
    </v-skeleton-loader>
  </div>
</template>

<script>
import TagBadge from '@/components/blog/public/TagBadge'

export default {
  name: 'Tag',
  components: { TagBadge }
}
</script>
