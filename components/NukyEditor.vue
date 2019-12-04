<template>
  <div>
    <ckeditor :value="value" :editor="editor" :config="editorConfig" />
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

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
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {}
    }
  }
}
</script>

<style scoped></style>
