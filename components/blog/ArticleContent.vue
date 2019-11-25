<template>
  <div padding class="editor">
    <editor-content class="editor__content" :editor="editor" />
  </div>
</template>

<script>
import { Editor, EditorContent } from 'tiptap'
import {
  Bold,
  Code,
  CodeBlockHighlight,
  HardBreak,
  Heading,
  Italic
} from 'tiptap-extensions'
import java from 'highlight.js/lib/languages/java'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'

export default {
  name: 'ArticleContent',
  components: {
    EditorContent
  },
  props: {
    content: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new CodeBlockHighlight({
            languages: {
              java,
              javascript,
              css
            }
          }),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Bold(),
          new Code(),
          new Italic()
        ],
        content: 'this.content'
      }),
      extensions: [
        new CodeBlockHighlight({
          languages: {
            java,
            javascript,
            css
          }
        })
      ]
    }
  }
}
</script>

<style scoped lang="scss"></style>
