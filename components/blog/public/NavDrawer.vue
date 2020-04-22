<template>
  <aside v-show="this.$vuetify.breakpoint.smAndDown">
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
      <v-icon v-text="mdiMenu" />
    </v-btn>
  </aside>
</template>

<script>
import { mdiMenu } from '@mdi/js'
import Intro from '@/components/blog/post-aside/Intro'
import { required } from '@/assets/utils/validation-rules'

export default {
  name: 'NavDrawer',
  components: {
    Intro,
  },
  data() {
    return {
      mdiMenu,
      appDrawer: false,
      inputRules: {
        required,
      },
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
          name: 'search',
          params: {
            keyword: this.keyword,
          },
        })
      }
    },
  },
}
</script>
