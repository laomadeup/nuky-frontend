<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="8" xl="9">
          <section>
            <client-only placeholder="Loading Editor ...">
              <nuky-editor ref="editor" :content.sync="content" />
            </client-only>
          </section>
        </v-col>
        <v-col cols="4" xl="3">
          <v-text-field
            :prepend-inner-icon="mdiFormatTitle"
            dense
            outlined
            label="Title"
          />
          <v-textarea
            :prepend-inner-icon="mdiSubtitlesOutline"
            auto-grow
            outlined
            :counter="220"
            label="Description"
          />
          <category-select dense outlined :chosen.sync="category" />
          <v-chip-group>
            <v-chip
              v-for="item in this.$store.state.article.tags"
              :key="item.id"
            >
              {{ item.name }}
            </v-chip>
          </v-chip-group>
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
  </div>
</template>

<script>
import { mdiContentSave, mdiFormatTitle, mdiSubtitlesOutline } from '@mdi/js'
import NukyEditor from '@/components/admin/public/NukyEditor'
import CategorySelect from '@/components/admin/article/CategorySelect'

export default {
  name: 'Edit',
  layout: 'Admin',
  components: { NukyEditor, CategorySelect },
  data() {
    return {
      mdiContentSave,
      mdiFormatTitle,
      mdiSubtitlesOutline,
      saving: false,
      category: null,
      content: null
    }
  },
  mounted() {
    this.$store.dispatch('article/getTags')
  },
  methods: {
    save() {
      this.saving = true
      console.log(this.content)
      setTimeout(() => {
        this.saving = false
      }, 1000)
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
