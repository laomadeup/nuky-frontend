<template>
  <nav>
    <v-navigation-drawer
      v-if="$vuetify.breakpoint.smAndDown"
      v-model="appDrawer"
      clipped
      color="grey lighten-4"
      app
    >
      <header
        class="my-5 headline text-center grey--text text--darken-1 font-weight-medium"
      >
        Kyun's Blog
      </header>

      <info />

      <v-divider class="my-4" />

      <v-list nav shaped>
        <v-list-item-group v-model="menu" color="primary">
          <v-list-item
            v-for="(menu, i) in menus"
            :key="i"
            :to="{ name: menu.router }"
            :exact="menu.exact"
            :class="menu.aliesActiceClasses($route.name)"
          >
            <v-list-item-icon>
              <v-icon v-text="menu.icon" />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.name" />
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-btn
      v-show="$vuetify.breakpoint.smAndDown"
      dark
      fab
      fixed
      right
      bottom
      color="info"
      @click.stop="toggleAppDrawer"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </nav>
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
    menu: 1,
    menus: [
      {
        router: 'index',
        name: 'Home',
        exact: true,
        icon: 'mdi-home',
        aliesActiceClasses(routeName) {
          return routeName === 'articles-page-number'
            ? 'v-list-item--active'
            : ''
        }
      },
      {
        router: 'about',
        name: 'About',
        exact: false,
        icon: 'mdi-help-circle',
        aliesActiceClasses() {
          return ''
        }
      }
    ],
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
