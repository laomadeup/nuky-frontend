<template>
  <nav>
    <v-app-bar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      :hide-on-scroll="$vuetify.breakpoint.smAndDown"
      color="primary"
      app
    >
      <v-btn text icon color="white" @click.stop="$router.back()">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="white--text mx-2 px-4">
        <span>Kyun's Blog</span>
      </v-toolbar-title>
      <v-spacer />
      <v-text-field
        style="max-width: 300px;"
        dense
        flat
        dark
        rounded
        solo-inverted
        hide-details
        single-line
        clearable
        label="Search"
        class="hidden-sm-and-down"
        color="primary"
        prepend-inner-icon="mdi-magnify"
        append-icon="mdi-arrow-right"
        :error="!searchInputState"
        @blur="searchInputState = true"
        @click:append="searchByKeyword()"
      />
      <v-app-bar-nav-icon
        v-show="$vuetify.breakpoint.mdAndDown"
        color="white"
        @click.stop="toggleLeftDrawer"
      />
    </v-app-bar>

    <v-navigation-drawer
      v-model="leftDrawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
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
  </nav>
</template>

<script>
import { required } from '@/assets/utils/validation-rules'

export default {
  name: 'Navbar',
  data: () => ({
    keyword: '',
    searchInputState: true,
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
    leftDrawer: null,
    inputRules: {
      required
    }
  }),
  methods: {
    toggleLeftDrawer() {
      this.leftDrawer = !this.leftDrawer
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
