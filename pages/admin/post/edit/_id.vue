<template>
  <div>
    <post-editor :post.sync="post">
      <template v-slot:action>
        <v-btn class="ml-2" :loading="saving" color="primary" @click="save()">
          <v-icon left v-text="mdiContentSave" />
          Save
        </v-btn>
      </template>
    </post-editor>
  </div>
</template>

<script>
import { mdiContentSave } from '@mdi/js'
import PostEditor from '@/components/admin/post/PostEditor'

export default {
  name: 'Edit',
  layout: 'Admin',
  components: {
    PostEditor,
  },
  data() {
    return {
      mdiContentSave,
      saving: false,
      post: {
        content: null,
        title: null,
        excerpt: null,
        categories: null,
        tags: null,
      },
    }
  },
  methods: {
    save() {
      this.saving = true
      setTimeout(() => {
        this.saving = false
      }, 1000)
    },
  },
  head() {
    return {
      title: 'Edit Post',
      meta: [
        {
          hid: 'Edit Post',
          name: 'Edit Post',
          content: 'Edit Post',
        },
      ],
    }
  },
}
</script>
