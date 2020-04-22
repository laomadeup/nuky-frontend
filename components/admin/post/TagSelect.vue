<template>
  <v-combobox
    :value="value"
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
    item-text="name"
    item-value="id"
    @input="select"
  >
    <template v-slot:no-data>
      <v-list-item>
        Press <kbd class="mx-1">enter</kbd> to create
        <v-chip small>{{ search }}</v-chip>
      </v-list-item>
    </template>
    <template v-slot:selection="{ attrs, item, parent, selected }">
      <v-chip
        v-if="item === Object(item)"
        v-bind="attrs"
        :input-value="selected"
        small
        close
        :color="item.isNew ? 'info' : ''"
        @click:close="parent.selectItem(item)"
      >
        {{ item.name }}
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
  name: 'TagSelect',
  props: {
    value: { type: Array, default: null },
  },
  data() {
    return {
      mdiTagMultiple,
      search: null,
    }
  },
  computed: {
    items() {
      return [{ header: 'Select a tag or create one' }].concat(
        this.$store.state.post.tags
      )
    },
  },
  mounted() {
    this.$store.dispatch('post/getTags')
  },
  methods: {
    select(tags) {
      for (let i = 0; i < tags.length; i++) {
        if (!(tags[i] instanceof Object)) {
          tags[i] = { id: null, name: tags[i], isNew: true }
        }
      }
      this.$emit('update:value', tags)
    },
    filter(item, queryText, itemText) {
      if (item.header) return false
      const hasValue = (val) => (val != null ? val : '')

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text
        .toString()
        .toLowerCase()
        .includes(query.toString().toLowerCase())
    },
  },
}
</script>
