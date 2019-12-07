<template>
  <div>
    <ckeditor v-model="editorData" :editor="editor" :config="editorConfig" />

    <b-container class="mt-2">
      <b-row>
        <b-col cols="2" offset="5">
          <b-button variant="primary" block @click="save()">Save</b-button>
        </b-col>
      </b-row>
    </b-container>
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
  data() {
    return {
      editor: ClassicEditor,
      editorData: this.value,
      editorConfig: defaultConfig
    }
  },
  methods: {
    save() {
      console.log(this.editorData)
    }
  }
}
</script>

<style scoped></style>
