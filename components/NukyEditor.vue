<template>
  <div>
    <ckeditor
      v-model="editorData"
      :editor="editor"
      :config="editorConfig"
    ></ckeditor>
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
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.content,
      editorConfig: {
        // The configuration of the editor.
      }
    }
  }
}
</script>
