<template>
  <div>
    <h3>Popular</h3>
    <v-skeleton-loader
      :loading="!this.$store.state.post.popularPosts"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    >
      <div
        v-for="(post, index) in this.$store.state.post.popularPosts"
        :key="index"
        :title="post.title"
      >
        <v-divider class="my-2" />
        <nuxt-link
          class="px-2 my-0 popular-item body-2"
          tag="p"
          :to="{ name: 'posts-id', params: { id: post.id } }"
        >
          {{ post.title }}
        </nuxt-link>
      </div>
      <v-divider class="my-2" />
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'Popular',
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.popular-item {
  cursor: pointer;
  line-height: 1.1rem;

  &:hover {
    color: map-get($blue, lighten-1);
    text-decoration-line: none;
  }
}
</style>
