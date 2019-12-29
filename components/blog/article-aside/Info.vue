<template>
  <v-skeleton-loader
    :loading="loading"
    type="list-item,list-item-avatar,list-item"
  >
    <v-container>
      <v-row class="mb-8">
        <v-text-field
          v-model="keyword"
          class="mx-2 mx-lg-8"
          dense
          filled
          flat
          rounded
          hide-details
          single-line
          clearable
          label="Search"
          color="info"
          prepend-inner-icon="mdi-magnify"
          :append-icon="searchInputFocus ? 'mdi-arrow-right' : ''"
          :error="!searchInputState"
          @blur="clearInputError"
          @focusin="setInputFocusState(true)"
          @focusout="setInputFocusState(false)"
          @click:append="searchByKeyword()"
        />
      </v-row>
      <v-row class="mb-4" justify="center">
        <nuxt-link :to="{ name: 'about' }">
          <v-avatar size="80">
            <v-img
              src="https://avatars0.githubusercontent.com/u/22534302?s=80"
              alt="Kyun"
            />
          </v-avatar>
        </nuxt-link>
      </v-row>
      <v-row align-content="center" justify="center">
        <v-btn title="Github" icon href="https://github.com/iamkyun">
          <v-icon>mdi-github-circle</v-icon>
        </v-btn>
        <v-btn tag="Email" icon href="mailto:admin@iamkyun.com">
          <v-icon>mdi-email</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-skeleton-loader>
</template>

<script>
import { required } from 'assets/utils/validation-rules'

export default {
  name: 'Info',
  data: () => ({
    loading: true,
    keyword: '',
    searchInputFocus: false,
    searchInputState: true
  }),
  mounted() {
    this.loading = false
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
    },
    clearInputError() {
      this.searchInputState = true
    },
    setInputFocusState(state) {
      this.searchInputFocus = state
    }
  }
}
</script>
