<template>
  <v-combobox
    v-model="value"
    :filter="filter"
    :hide-no-data="!search"
    :items="items"
    :search-input.sync="search"
    hide-selected
    label="Tag"
    :prepend-inner-icon="mdiTagMultiple"
    multiple
    small-chips
    outlined
    dense
    hide-details
  >
    <template v-slot:no-data>
      <v-list-item>
        <span class="subheading">Create {{ search }}</span>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attrs, item, selected }">
      <v-chip
        v-if="item === Object(item)"
        v-bind="attrs"
        :input-value="selected"
        small
        close
      >
        <span class="pr-2">
          {{ item.name }}
        </span>
      </v-chip>
    </template>
    <template v-slot:item="{ item }">
      <v-chip small>
        {{ item.name }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<script>
import { mdiTagMultiple } from '@mdi/js'

export default {
  name: 'CategorySelect',
  props: {
    value: { type: Object, default: null }
  },
  data() {
    return {
      mdiTagMultiple,
      items: [{ header: 'Select a tag or create one' }].concat(
        this.$store.state.article.tags
      ),
      search: null
    }
  },
  mounted() {
    this.$store.dispatch('article/getTags')
  },
  methods: {
    select(value) {
      this.$emit('update:tags', value)
    }
  }
}
</script>
