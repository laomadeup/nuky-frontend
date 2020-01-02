<template>
  <div>
    <div class="editor-content">
      <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />
    </div>

    <v-container class="mt-2">
      <v-row>
        <v-col cols="2" offset="5">
          <v-btn color="primary" block @click="save()">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
let CKEditor = { component: '' }
let ClassicEditor = {}
let defaultConfig = {}

if (process.client) {
  CKEditor = require('@ckeditor/ckeditor5-vue')
  ClassicEditor = require('@ckeditor/ckeditor5-editor-classic/src/classiceditor')
    .default
  defaultConfig = require('@/assets/config/editor-config').default
}

export default {
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: defaultConfig,
      editorData: this.value
    }
  },
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
