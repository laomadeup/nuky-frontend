<template>
  <div>
    <intro />
    <popular class="mt-10" />
    <category class="mt-10" />
    <tag class="mt-10" />
  </div>
</template>

<script>
import Intro from '@/components/blog/post-aside/Intro'
import Popular from '@/components/blog/post-aside/Popular'
import Category from '@/components/blog/post-aside/Category'
import Tag from '@/components/blog/post-aside/Tag'
export default {
  name: 'Aside',
  components: {
    Popular,
    Category,
    Tag,
    Intro,
  },
  mounted() {
    this.$store.dispatch('post/getPostAside')
  },
}
</script>
