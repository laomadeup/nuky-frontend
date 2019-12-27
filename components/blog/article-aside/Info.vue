<template>
  <v-container>
    <v-row class="mb-8">
      <v-text-field
        class="mx-2 mx-lg-8"
        background-color="grey lighten-2"
        dense
        rounded
        hide-details
        single-line
        clearable
        label="Search"
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
      <v-avatar size="80">
        <img src="/avatar.jpg" alt="Kyun" />
      </v-avatar>
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
</template>

<script>
import { required } from 'assets/utils/validation-rules'

export default {
  name: 'Header',
  data: () => ({
    keyword: '',
    searchInputFocus: false,
    searchInputState: true
  }),
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
