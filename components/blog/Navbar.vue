<template>
  <nav>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      :clipped-right="$vuetify.breakpoint.mdAndUp"
      color="primary"
      app
    >
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        @click.stop="toggleLeftDrawer"
      />

      <v-toolbar-title class="white--text mx-2 px-4">
        <span>Kyun's Blog</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row style="max-width: 500px;">
        <v-col cols="8">
          <v-text-field
            dense
            flat
            dark
            rounded
            solo-inverted
            hide-details
            single-line
            prepend-inner-icon="mdi-magnify"
            label="Search"
            class="hidden-sm-and-down"
            color="primary"
          />
        </v-col>
        <v-col cols="4">
          <v-btn rounded color="grey lighten-3">Search</v-btn>
        </v-col>
      </v-row>
    </v-app-bar>

    <v-navigation-drawer
      v-model="leftDrawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      width="250"
      color="grey lighten-4"
      app
      class="pt-5"
    >
      <v-list>
        <v-row justify="center">
          <v-avatar size="80">
            <img src="/avatar.jpg" alt="Kyun" />
          </v-avatar>
        </v-row>

        <v-list-item dense href="https://github.com/iamkyun" target="_blank">
          <v-list-item-icon>
            <v-icon>mdi-github-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>iamKyun</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item dense href="mailto:admin@iamkyun.com">
          <v-list-item-icon>
            <v-icon>mdi-email</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>admin@iamkyun.com</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider class="my-2" />

      <v-list nav>
        <v-list-item-group v-model="menu" color="primary">
          <v-list-item
            v-for="(menu, i) in menus"
            :key="i"
            :to="{ name: menu.router }"
            :exact="menu.exact"
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

    <slot name="rightNavDrawer" :rightDrawer="rightDrawer"></slot>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    keyword: '',
    searchInputState: null,
    menu: 1,
    menus: [
      { router: 'index', name: 'Home', exact: true, icon: 'mdi-home' },
      { router: 'about', name: 'About', exact: false, icon: 'mdi-help-circle' }
    ],
    leftDrawer: null,
    rightDrawer: null
  }),
  methods: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer
    },
    toggleRightDrawer() {
      this.rightDrawer = !this.rightDrawer
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
