<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="8" xl="9">
        <section>
          <client-only placeholder="Loading Editor ...">
            <nuky-editor ref="editor" :content.sync="post.content" />
          </client-only>
        </section>
      </v-col>
      <v-col cols="12" sm="4" xl="3">
        <v-text-field
          v-model="post.title"
          :prepend-inner-icon="mdiFormatTitle"
          dense
          outlined
          :counter="100"
          label="Title"
        />
        <v-textarea
          v-model="post.excerpt"
          :prepend-inner-icon="mdiSubtitlesOutline"
          auto-grow
          outlined
          :counter="220"
          class="mt-2"
          label="Excerpt"
        />
        <category-select
          class="mt-2"
          dense
          hide-details
          icon
          outlined
          multiple
          :value.sync="post.categories"
        />
        <new-category-btn btn-text></new-category-btn>

        <tag-select class="mt-4" dense outlined :value.sync="post.tags" />

        <v-checkbox
          v-model="post.isSticky"
          color="primary"
          label="Stick to the top of the blog"
        />

        <v-row class="mt-2">
          <v-col class="text-right">
            <v-btn color="success">
              <v-icon left v-text="mdiCardSearch" />
              Preview
            </v-btn>
            <slot name="action" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiCardSearch, mdiFormatTitle, mdiSubtitlesOutline } from '@mdi/js'
import NukyEditor from '@/components/admin/public/NukyEditor'
import CategorySelect from '@/components/admin/post/CategorySelect'
import TagSelect from '@/components/admin/post/TagSelect'
import NewCategoryBtn from '@/components/admin/public/NewCategoryBtn'

export default {
  name: 'PostEditor',
  components: { NukyEditor, CategorySelect, TagSelect, NewCategoryBtn },
  props: {
    post: {
      type: Object,
      default() {
        return {
          content: null,
          title: null,
          excerpt: null,
          categories: null,
          tags: null,
          isSticky: false,
        }
      },
    },
  },
  data() {
    return {
      mdiFormatTitle,
      mdiSubtitlesOutline,
      mdiCardSearch,
    }
  },
  watch: {
    post(value) {
      this.$emit('update:post', value)
    },
  },
}
</script>
