<template>
  <v-container>
    <v-row>
      <v-col cols="8" xl="9">
        <section>
          <client-only placeholder="Loading Editor ...">
            <nuky-editor ref="editor" :content.sync="article.content" />
          </client-only>
        </section>
      </v-col>
      <v-col cols="4" xl="3">
        <v-text-field
          v-model="article.title"
          :prepend-inner-icon="mdiFormatTitle"
          dense
          outlined
          label="Title"
        />
        <v-textarea
          v-model="article.excerpt"
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
          outlined
          multiple
          :value.sync="article.categories"
        />
        <tag-select class="mt-2" dense outlined :value.sync="article.tags" />
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="12" class="text-center">
        <v-btn :loading="saving" color="primary" @click="save()">
          <v-icon left v-text="mdiContentSave" />Save
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mdiContentSave, mdiFormatTitle, mdiSubtitlesOutline } from '@mdi/js'
import NukyEditor from '@/components/admin/public/NukyEditor'
import CategorySelect from '@/components/admin/article/CategorySelect'
import TagSelect from '@/components/admin/article/TagSelect'

export default {
  name: 'ArticleEditor',
  components: { NukyEditor, CategorySelect, TagSelect },
  props: {
    article: {
      type: Object,
      default() {
        return {
          content: null,
          title: null,
          excerpt: null,
          categories: null,
          tags: null
        }
      }
    }
  },
  data() {
    return {
      mdiContentSave,
      mdiFormatTitle,
      mdiSubtitlesOutline,
      saving: false
    }
  },
  methods: {
    save() {
      this.saving = true

      setTimeout(() => {
        this.saving = false
      }, 1000)
    }
  }
}
</script>
