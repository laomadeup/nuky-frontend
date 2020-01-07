<template>
  <div class="search-field mx-auto">
    <v-text-field
      v-model="keyword"
      outlined
      rounded
      clearable
      dense
      label="Search"
      color="info"
      aria-label="search"
      @click:append-outer="searchByKeyword()"
    >
      <template v-slot:append-outer>
        <v-btn rounded depressed color="primary">
          <v-icon>{{ mdiMagnify }}</v-icon>
          search
        </v-btn>
      </template>
    </v-text-field>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'
import { required } from 'assets/utils/validation-rules'

export default {
  layout: 'Blog',
  data() {
    return {
      mdiMagnify,
      keyword: this.$route.params.keyword
    }
  },
  methods: {
    searchByKeyword() {
      if (required(this.keyword) !== true) {
        this.searchInputState = false
      } else {
        this.$router.push({
          name: 'search-keyword',
          params: {
            keyword: this.keyword
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.search-field {
  max-width: 800px;

  &::v-deep {
    .v-input__append-outer {
      margin-top: 0 !important;
    }
  }
}
</style>
