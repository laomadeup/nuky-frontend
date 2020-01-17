<template>
  <v-container class="pa-0">
    <v-row>
      <v-col class="py-1">
        <v-tooltip left content-class="py-0 caption">
          <template v-slot:activator="{ on, value }">
            <span class="mr-3" v-on="on">
              <v-icon color="grey" v-text="value ? mdiFolderOpen : mdiFolder" />
              <span
                v-for="(category, index) in categories"
                :key="index"
                class="categories"
              >
                <span v-if="index > 0" class="separator">/</span>
                <nuxt-link
                  class="category mr-1"
                  tag="span"
                  :to="{
                    name: 'category-id',
                    params: { id: category.id }
                  }"
                  >{{ category.name }}</nuxt-link
                >
              </span>
            </span>
          </template>
          <span>Category</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="py-1">
        <v-tooltip left content-class="py-0 caption">
          <template v-slot:activator="{ on }">
            <span v-on="on">
              <v-icon color="grey" v-text="mdiTagMultiple" />
              <tag-badge :tags="tags" />
            </span>
          </template>
          <span>Tag</span>
        </v-tooltip>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiFolder, mdiFolderOpen, mdiTagMultiple } from '@mdi/js'
import TagBadge from '@/components/blog/public/TagBadge'
export default {
  name: 'ArticleInfo',
  components: { TagBadge },
  props: {
    tags: {
      type: Array,
      default: null
    },
    categories: {
      type: Array,
      default: null
    }
  },
  data() {
    return { mdiFolder, mdiFolderOpen, mdiTagMultiple, icon: mdiFolder }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.categories {
  color: map-get($grey, darken-2);
  min-width: 120px;

  .category,
  .separator {
    position: relative;
    top: 2px;
    font-size: 0.875rem;
  }

  .category {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid map-get($grey, lighten-5);

    &:hover {
      border-color: map-get($grey, base);
    }
  }
}
</style>
