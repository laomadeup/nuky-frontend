<template>
  <div>
    <section class="ma-4">
      <client-only placeholder="Loading Editor ...">
        <nuky-editor ref="editor" :content.sync="content" />
      </client-only>
    </section>

    <v-container>
      <v-row>
        <v-col cols="2" offset="5">
          <v-btn color="primary" block @click="save()">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import NukyEditor from '@/components/admin/public/NukyEditor'

export default {
  name: 'Edit',
  layout: 'Admin',
  components: { NukyEditor },
  data() {
    return { content: null }
  },
  methods: {
    save() {
      console.log(this.content)
    }
  },
  head() {
    return {
      title: 'Article Edit',
      meta: [
        {
          hid: 'Article Edit',
          name: 'Article Edit',
          content: 'Article Edit'
        }
      ]
    }
  }
}
</script>
