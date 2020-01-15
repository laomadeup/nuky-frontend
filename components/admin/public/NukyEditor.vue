<template>
  <div class="editor-content">
    <ckeditor
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
      @input="emitContent"
    />
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
  name: 'NukyEditor',
  components: {
    ckeditor: CKEditor.component
  },
  props: {
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: defaultConfig,
      editorData: this.content
    }
  },
  methods: {
    emitContent() {
      this.$emit('update:content', this.editorData)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~assets/style/common/editor-content.scss';
</style>
