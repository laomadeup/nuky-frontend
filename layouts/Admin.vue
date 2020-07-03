<template>
  <v-app>
    <v-app-bar
      clipped-left
      app
      color="blue darken-3"
      dark
      :mini-variant.sync="mini"
    >
      <v-toolbar-title style="width: 300px;" class="ml-0 pl-4">
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
      <nuxt />
    </v-content>
  </v-app>
</template>

<script>
import {
  mdiBookPlus,
  mdiFolderOpen,
  mdiCogOutline,
  mdiChartLine,
  mdiTag,
  mdiBookshelf,
  mdiCommentTextMultiple
} from '@mdi/js'

export default {
  data: () => ({
    mini: false,
    items: [
      {
        icon: mdiChartLine,
        text: 'Dashboard',
        route: 'admin-dashboard'
      },
      {
        icon: mdiBookshelf,
        text: 'Posts',
        route: 'admin-posts'
      },
      {
        icon: mdiBookPlus,
        text: 'New Post',
        route: 'admin-post-new'
      },
      {
        icon: mdiFolderOpen,
        text: 'Categories',
        route: 'admin-categories'
      },
      { icon: mdiTag, text: 'Tag', route: 'admin-tags' },
      {
        icon: mdiCommentTextMultiple,
        text: 'Comments',
        route: 'admin-comments'
      },
      { icon: mdiCogOutline, text: 'Settings', route: 'admin-settings' }
    ]
  })
}
</script>
