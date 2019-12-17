<template>
  <nav>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      color="blue lighten-1"
      app
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        @click.stop="toggleDrawer"
      />

      <v-toolbar-title class="ml-2 mr-2 pl-4 pr-4">
        <span>Kyun's Blog</span>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="mdi-magnify"
        label="Search"
        class="hidden-sm-and-down"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      app
    >
      <v-list dense nav>
        <v-list-item-group color="primary">
          <v-list-item v-for="(menu, i) in menus" :key="i" :to="menu.router">
            <v-list-item-icon>
              <v-icon v-text="menu.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="menu.name"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    keyword: '',
    searchInputState: null,
    menus: [
      { router: 'index', name: 'Home', exact: true, icon: 'mdi-home' },
      { router: 'about', name: 'About', exact: false, icon: 'mdi-help-circle' }
    ],
    drawer: null
  }),
  methods: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    searchByKeyword() {
      if (this.keyword == null || this.keyword === '') {
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
