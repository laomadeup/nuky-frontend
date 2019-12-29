<template>
  <div>
    <div class="editor-content">
      <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
    </div>

    <v-container class="mt-2">
      <v-row>
        <v-col cols="2" offset="5">
          <v-btn variant="primary" block @click="save()">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CKEditor from '@ckeditor/ckeditor5-vue'
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor'
import defaultConfig from '@/assets/config/editor-config'

export default {
  name: 'NukyEditor',
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    editor: ClassicEditor,
    editorData: this.value,
    editorConfig: defaultConfig
  }),
  methods: {
    save() {
      console.log(this.editorData)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/editor-content.scss';
</style>
