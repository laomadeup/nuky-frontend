<template>
  <div>
    <post-editor :post.sync="post">
      <template v-slot:action>
        <v-btn class="ml-2" :loading="saving" color="primary" @click="save()">
          <v-icon left v-text="mdiPublish" />
          Post
        </v-btn>
      </template>
    </post-editor>
  </div>
</template>

<script>
import { mdiPublish } from '@mdi/js'
import PostEditor from '@/components/admin/post/PostEditor'

export default {
  name: 'New',
  layout: 'Admin',
  components: {
    PostEditor
  },
  data() {
    return {
      mdiPublish,
      saving: false,
      post: {
        content: null,
        title: null,
        excerpt: null,
        categories: null,
        tags: null
      }
    }
  },
  methods: {
    save() {
      this.saving = true
      setTimeout(() => {
        this.saving = false
      }, 1000)
    }
  },
  head() {
    return {
      title: 'Post New Post',
      meta: [
        {
          hid: 'Post New Post',
          name: 'Post New Post',
          content: 'Post New Post'
        }
      ]
    }
  }
}
</script>
