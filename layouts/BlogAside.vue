<template>
  <blog>
    <template v-slot:content>
      <div>
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
