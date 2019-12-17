<template>
  <section class="mb-1 clearfix">
    <span class="category mr-3" title="Category">
      <fa-icon class="text-secondary icon" :icon="icon" />
      <span @mouseover="mouseoverIcon" @mouseleave="mouseleaveIcon">
        <nuxt-link
          class="category-name ml-1 mr-1"
          tag="span"
          :to="{ name: 'search-category-id', params: { id: category.id } }"
          >{{ category.name }}</nuxt-link
        >
      </span>
    </span>
    <tag-badge class="tag" :tags="tags" title="Tags" />
  </section>
</template>

<script>
import TagBadge from '@/components/blog/public/TagBadge'

export default {
  name: 'ArticleTags',
  components: { TagBadge },
  props: {
    tags: {
      type: Array,
      default: null
    },
    category: {
      type: Object,
      default: null
    }
  },
  data() {
    return { icon: ['fas', 'folder'] }
  },
  methods: {
    mouseoverIcon() {
      this.icon = ['fas', 'folder-open']
    },
    mouseleaveIcon() {
      this.icon = ['fas', 'folder']
    }
  }
}
</script>

<style scoped lang="scss">
.clearfix::after {
  content: ' ';
  display: block;
  height: 0;
  clear: both;
}

.tag {
  float: right;
}

.category {
  float: left;
  color: #666;
  min-width: 120px;
  display: inline-block;

  .category-name {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid #fff;

    &:hover {
      border-color: #aaa;
    }
  }

  .icon {
    min-width: 18px;
  }
}
</style>
