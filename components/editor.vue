<template>
  <div>
    <div id="editor"></div>
    <b-button @click="save"> Save</b-button>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'highlight.js/styles/vs2015.css'
import hljs from 'highlight.js'

let Quill
if (process.client) {
  hljs.configure({
    languages: ['javascript', 'java', 'css', 'xml']
  })
  Quill = require('quill')
}

const modules = {
  syntax: {
    highlight: (text) => hljs.highlightAuto(text).value
  },
  toolbar: [
    [{ header: [false, 1, 2, 3, 4, 5, 6] }],
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [
      { align: '' },
      { align: 'center' },
      { align: 'right' },
      { align: 'justify' }
    ],
    ['blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    ['link', 'image', 'video'],
    ['clean'] // remove formatting button
  ]
}

export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null
    }
  },
  watch: {
    value(val) {
      if (val !== this.editor.root.innerHTML && !this.editor.hasFocus()) {
        this.editor.root.innerHTML = val
      }
    },
    disabled(status) {
      this.quill.enable(!status)
    }
  },
  mounted() {
    this.editor = new Quill('#editor', {
      modules,
      theme: 'snow'
    })
    if (this.value) {
      this.editor.root.innerHTML = this.value
    }
  },
  beforeDestroy() {
    this.editor = null
    delete this.editor
  },
  methods: {
    save() {
      console.log(this.editor.root.innerHTML)
    }
  }
}
</script>

<style scoped></style>
