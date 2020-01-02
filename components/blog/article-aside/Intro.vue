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
        <v-avatar size="80">
          <v-img
            src="https://avatars0.githubusercontent.com/u/22534302?s=80"
            alt="Kyun"
          />
        </v-avatar>
      </v-row>
      <v-row align-content="center" justify="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon href="https://github.com/iamkyun" v-on="on">
              <v-icon>mdi-github-circle</v-icon>
            </v-btn>
          </template>
          <span>Github</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon href="mailto:admin@iamkyun.com" v-on="on">
              <v-icon>mdi-email</v-icon>
            </v-btn>
          </template>
          <span>Email</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon :to="{ name: 'about' }" v-on="on">
              <v-icon>mdi-information</v-icon>
            </v-btn>
          </template>
          <span>About</span>
        </v-tooltip>
      </v-row>
    </v-container>
  </v-skeleton-loader>
</template>

<script>
import { required } from 'assets/utils/validation-rules'

export default {
  data() {
    return {
      loading: true,
      keyword: '',
      searchInputFocus: false,
      searchInputState: true
    }
  },
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
