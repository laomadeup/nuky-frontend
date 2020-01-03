<template>
  <blog>
    <template v-slot:content>
      <div
        class="app-container ma-auto py-2 py-sm-5 py-md-10 px-5 px-sm-10 px-md-10 px-lg-0"
      >
        <v-row>
          <v-col cols="12" md="8">
            <nuxt />
          </v-col>
          <v-col md="4" class="hidden-sm-and-down">
            <v-divider vertical class="float-left" />
            <app-aside class="pl-5" />
          </v-col>
        </v-row>
      </div>
    </template>
  </blog>
</template>

<script>
import Blog from '@/layouts/Blog'
import Aside from '@/components/blog/public/Aside'

export default {
  name: 'BlogAside',
  components: {
    Blog,
    appAside: Aside
  }
}
</script>

<style scoped lang="scss">
.app-container {
  max-width: 1200px !important;
}
</style>
