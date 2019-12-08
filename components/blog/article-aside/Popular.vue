<template>
  <div>
    <h5>
      <fa-icon class="text-danger" :icon="['fas', 'fire-alt']" />
      Popular
    </h5>
    <nuxt-link
      v-for="(article, index) in popularArticles"
      :id="'pop-' + article.id"
      :key="index"
      class="mb-0 pb-2 pt-2 pl-2 popular-item"
      tag="p"
      :to="{ name: 'article-id', params: { id: article.id } }"
    >
      {{ article.title }}
      <b-popover
        :target="'pop-' + article.id"
        triggers="hover"
        placement="bottom"
        variant="dark"
      >
        {{ article.title }}
      </b-popover>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'Popular',
  data() {
    return { popularArticles: this.$store.state.article.popularArticles }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/public';

.popular-item {
  cursor: pointer;
  border-top: 1px solid $gray-300;
  line-height: 1.4rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.popular-item:hover {
  color: $link-hover-color;
  text-decoration-line: underline;
}

.popular-item:last-child {
  border-bottom: 1px solid $gray-300;
}
</style>
