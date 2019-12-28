<template>
  <aside>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
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

      <info />
    </v-navigation-drawer>
    <v-btn
      v-show="$vuetify.breakpoint.smAndDown"
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
import Info from '@/components/blog/article-aside/Info'
import { required } from '@/assets/utils/validation-rules'

export default {
  name: 'Navbar',
  components: {
    Info
  },
  data: () => ({
    appDrawer: false,
    inputRules: {
      required
    }
  }),
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
