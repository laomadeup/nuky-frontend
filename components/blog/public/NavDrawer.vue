<template>
  <aside v-if="showDarwer">
    <v-navigation-drawer
      v-model="appDrawer"
      clipped
      color="grey lighten-4"
      temporary
      floating
      app
    >
      <header
        class="my-5 headline text-center grey--text text--darken-1 font-weight-medium"
      >
        Kyun's Blog
      </header>

      <intro />
    </v-navigation-drawer>
    <v-btn
      small
      dark
      fab
      fixed
      right
      bottom
      color="primary"
      @click.stop="toggleAppDrawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </aside>
</template>

<script>
import Intro from '@/components/blog/article-aside/Intro'
import { required } from '@/assets/utils/validation-rules'

export default {
  name: 'Navbar',
  components: {
    Intro
  },
  data: () => ({
    appDrawer: false,
    inputRules: {
      required
    }
  }),
  computed: {
    showDarwer() {
      return !!this.$vuetify.breakpoint.smAndDown
    }
  },
  methods: {
    toggleAppDrawer() {
      this.appDrawer = !this.appDrawer
    },
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
