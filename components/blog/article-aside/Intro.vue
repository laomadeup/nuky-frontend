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
          aria-label="search"
          :error="!searchInputState"
          @blur="clearInputError"
          @focusin="setInputFocusState(true)"
          @focusout="setInputFocusState(false)"
          @click:append="searchByKeyword()"
        >
          <template v-slot:prepend-inner>
            <v-icon>{{ mdiMagnify }}</v-icon>
          </template>
          <template v-if="searchInputFocus" v-slot:append>
            <v-icon>{{ mdiArrowRight }}</v-icon>
          </template>
        </v-text-field>
      </v-row>
      <v-row class="mb-4" justify="center">
        <v-avatar size="80">
          <v-img
            src="https://iamkyun-profile-img.oss-cn-shenzhen.aliyuncs.com/avatar.jpg?x-oss-process=image/auto-orient,1/resize,m_lfit,w_80/quality,q_100"
            alt="Kyun"
          />
        </v-avatar>
      </v-row>
      <v-row align-content="center" justify="center">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              icon
              href="https://github.com/iamkyun"
              aria-label="github"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon>{{ mdiGithubCircle }}</v-icon>
            </v-btn>
          </template>
          <span>Github</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn
              icon
              href="mailto:admin@iamkyun.com"
              aria-label="email"
              v-on="on"
            >
              <v-icon>{{ mdiEmail }}</v-icon>
            </v-btn>
          </template>
          <span>Email</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn icon :to="{ name: 'about' }" aria-label="about" v-on="on">
              <v-icon>{{ mdiInformation }}</v-icon>
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
import {
  mdiGithubCircle,
  mdiEmail,
  mdiInformation,
  mdiMagnify,
  mdiArrowRight
} from '@mdi/js'

export default {
  name: 'Intro',
  data() {
    return {
      mdiGithubCircle,
      mdiEmail,
      mdiInformation,
      mdiMagnify,
      mdiArrowRight,
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
