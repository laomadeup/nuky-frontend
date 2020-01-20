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

        <v-dialog v-model="addCateogryDialog" persistent max-width="300">
          <template v-slot:activator="{ on }">
            <v-btn
              small
              color="primary"
              text
              class="mt-1 px-1"
              @click="addCategory"
              v-on="on"
            >
              Add New Category
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Add New Category</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      v-model="newCategories.name"
                      label="New Category Name"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <category-select
                      class="mt-2"
                      label="Parent Category"
                      :value.sync="newCategories.parent"
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="addCateogryDialog = false">
                Close
              </v-btn>
              <v-btn color="primary" text @click="addCateogryDialog = false">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <tag-select class="mt-4" dense outlined :value.sync="post.tags" />

        <v-checkbox
          v-model="post.isSticky"
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

export default {
  name: 'PostEditor',
  components: { NukyEditor, CategorySelect, TagSelect },
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
          isSticky: false
        }
      }
    }
  },
  data() {
    return {
      mdiFormatTitle,
      mdiSubtitlesOutline,
      mdiCardSearch,
      addCateogryDialog: null,
      newCategories: { name: null, parent: null }
    }
  },
  watch: {
    post(value) {
      this.$emit('update:post', value)
    }
  },
  methods: {
    addCategory() {
      this.newCategories = { name: null, parent: null }
    }
  }
}
</script>
