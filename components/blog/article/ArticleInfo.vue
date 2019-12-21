<template>
  <v-row class="mx-0">
    <v-col cols="12" md="4" sm="4" class="pa-0">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span class="category mr-3" v-on="on">
            <v-icon color="grey">{{ icon }}</v-icon>
            <span @mouseover="mouseoverIcon" @mouseleave="mouseleaveIcon">
              <nuxt-link
                class="category-name mx-1"
                tag="span"
                :to="{
                  name: 'search-category-id',
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
    <v-col cols="12" md="8" sm="8" class="pa-0">
      <tag-badge class="float-none float-sm-right" :tags="tags" />
    </v-col>
  </v-row>
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
    return { icon: 'mdi-folder' }
  },
  methods: {
    mouseoverIcon() {
      this.icon = 'mdi-folder-open'
    },
    mouseleaveIcon() {
      this.icon = 'mdi-folder'
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.category {
  color: map-get($grey, darken-2);
  min-width: 120px;

  .category-name {
    cursor: pointer;
    transition: border-bottom 0.25s;
    border-bottom: 2px solid map-get($grey, lighten-5);
    position: relative;
    top: 2px;

    &:hover {
      border-color: map-get($grey, base);
    }
  }
}
</style>
