<template>
  <section class=" article-body mb-8">
    <nuxt-link
      tag="h4"
      class="title grey--text text--darken-4"
      :to="{ name: 'article-id', params: { id: id } }"
    >
      <slot name="title"></slot>
    </nuxt-link>
    <p class="article-excerpt my-2">
      <slot name="content"></slot>
    </p>
    <section class="artcile-footer my-2">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <section class="d-inline-block mr-4" v-on="on">
            <v-icon small v-text="mdiCalendarTextOutline" />
            <time class="verticalalign-middle">
              <slot name="date"></slot>
            </time>
          </section>
        </template>
        <span>post date</span>
      </v-tooltip>
    </section>
  </section>
</template>

<script>
import { mdiCalendarTextOutline } from '@mdi/js'

export default {
  name: 'Article',
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      mdiCalendarTextOutline
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.article-body {
  .title {
    cursor: pointer;
    display: inline-block;

    &:hover {
      color: map-get($blue, darken-2) !important;
      text-decoration: underline !important;
    }
  }

  .article-excerpt {
    height: 3rem;
    line-height: 1.5rem;
    overflow: hidden;
    color: map-get($grey, darken-3);
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .artcile-footer {
    font-size: 0.85rem;
  }
}
</style>
