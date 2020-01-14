<template>
  <div>
    <h3>Categories</h3>
    <v-skeleton-loader
      :loading="!categories"
      type="list-item-three-line,list-item-three-line,list-item-three-line"
    >
      <v-divider class="my-2" />
      <div class="p-2">
        <div
          v-for="category in categories"
          :key="category.id"
          :class="`category-item pb-1 pt-1 pl-${category.layer * 4}`"
        >
          <nuxt-link
            class="category-name pb-1 ml-1"
            tag="span"
            :to="{ name: 'search-category-id', params: { id: category.id } }"
            >{{ category.name }}
          </nuxt-link>
          <span>({{ category.amount }})</span>
        </div>
      </div>
      <v-divider class="my-2" />
    </v-skeleton-loader>
  </div>
</template>

<script>
export default {
  name: 'Category',
  data() {
    return {
      categories: []
    }
  },
  mounted() {
    const storeCategories = this.$store.state.article.categories || []
    this.pushData(storeCategories, 0)
  },
  methods: {
    pushData(storeCategories, layer) {
      for (const category of storeCategories) {
        this.categories.push({
          id: category.id,
          name: category.name,
          layer,
          amount: category.amount
        })
        if (category.subCategories && category.subCategories.length > 0) {
          this.pushData(category.subCategories, layer + 1)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.category-item {
  line-height: 1.4rem;

  .category-name {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid map-get($grey, lighten-5);

    &:hover {
      border-color: map-get($grey, base);
    }
  }
}
</style>
