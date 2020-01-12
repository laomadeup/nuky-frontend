<template>
  <v-app>
    <v-app-bar
      clipped-left
      app
      color="blue darken-3"
      dark
      :mini-variant.sync="mini"
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>Kyun's Blog</span>
      </v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      permanent
      clipped
      app
      :expand-on-hover="$vuetify.breakpoint.mdAndDown"
    >
      <v-list dense nav expand>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          :to="{ name: item.route }"
          color="primary"
          link
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon" />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <v-container fluid>
        <v-row align="start" justify="center">
          <nuxt />
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  mdiBookPlus,
  mdiFolderOpen,
  mdiSpeedometer,
  mdiTag,
  mdiViewList,
  mdiSettings
} from '@mdi/js'

export default {
  data: () => ({
    mini: false,
    items: [
      {
        icon: mdiSpeedometer,
        text: 'Dashboard',
        route: 'admin-dashboard'
      },
      {
        icon: mdiViewList,
        text: 'All Articles',
        route: 'admin-article-list'
      },
      {
        icon: mdiBookPlus,
        text: 'Post Article',
        route: 'admin-article-edit'
      },
      {
        icon: mdiFolderOpen,
        text: 'Category',
        route: 'admin-article-category'
      },
      { icon: mdiTag, text: 'Tag', route: 'admin-article-tag' },
      { icon: mdiSettings, text: 'Settings', route: 'admin-settings' }
    ]
  })
}
</script>
