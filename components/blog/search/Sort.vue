<template>
  <section class="sort">
    <v-btn id="sort-text" x-small text disabled>SORT BY : </v-btn>
    <v-btn-toggle v-model="sortIndex" mandatory @change="sortChange">
      <v-btn x-small>
        POST DATE
        <v-icon right small v-text="mdiSortDescending" />
      </v-btn>
      <v-btn x-small>
        POST DATE
        <v-icon right small v-text="mdiSortAscending" />
      </v-btn>
    </v-btn-toggle>
  </section>
</template>

<script>
import { mdiSortAscending, mdiSortDescending } from '@mdi/js'

const sort = [
  { field: 'publishDate', order: 'desc' },
  {
    field: 'publishDate',
    order: 'asc',
  },
]

export default {
  name: 'Sort',
  props: {
    sort: {
      type: Object,
      default: sort[0],
    },
  },
  data() {
    return { mdiSortAscending, mdiSortDescending, sortIndex: 0 }
  },
  mounted() {
    if (!this.sort) {
      this.$emit('update:sort', sort[0])
    }
  },
  methods: {
    sortChange() {
      this.$emit('update:sort', sort[this.sortIndex])
      this.$emit('change')
    },
  },
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

#sort-text {
  color: map-get($grey, 'darken-3') !important;
}
</style>
