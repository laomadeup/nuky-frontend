<template>
  <v-card class="mx-auto mt-10" max-width="80%">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          Something About Me
        </v-list-item-title>
        <v-list-item-subtitle>
          Greyhound divisely hello coldly fonwderfully
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  layout: 'AppBlog',
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'About',
          name: 'About',
          content: 'About'
        }
      ]
    }
  }
}
</script>
