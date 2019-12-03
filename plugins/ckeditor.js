import Vue from 'vue'
if (process.client) {
  const CKEditor = require('@ckeditor/ckeditor5-vue')
  Vue.use(CKEditor)
}
