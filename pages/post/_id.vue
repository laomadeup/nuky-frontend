<template>
  <div>
    <div v-if="post.id == null">Post Not Found</div>
    <div v-else>
      <article>
        <header class="mb-4">
          <h2>{{ post.title }}</h2>
          <post-info
            class="my-2"
            :tags="post.tags"
            :categories="post.categories"
          />
          <section>
            <v-icon v-text="mdiCalendar" />
            <time class="verticalalign-text-top">
              {{ $moment(post.publishDate).format('YYYY-MM-DD HH:mm') }}
            </time>
          </section>
        </header>
        <post-content :content="post.content" />
      </article>
      <div class="divider my-12 mx-5">
        <span class="px-6">END</span>
      </div>
      <post-comment :post-id="post.id" :comment-amount="post.commentAmount" />
    </div>
  </div>
</template>

<script>
import { mdiCalendar } from '@mdi/js'
import PostComment from '@/components/blog/post/PostComment'
import PostContent from '@/components/blog/post/PostContent'
import PostInfo from '@/components/blog/post/PostInfo'
export default {
  layout: 'BlogAside',
  components: {
    PostComment,
    PostContent,
    PostInfo
  },
  async asyncData({ params, $axios }) {
    const data = await $axios.$get(`/api/post-api/post/${params.id}`)
    return { post: data }
  },
  data() {
    return {
      mdiCalendar,
      post: null
    }
  },
  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: 'Post',
          name: 'Post',
          content: this.post.title
        }
      ]
    }
  },
  // params.id must be number
  validate: ({ params }) => /^\d+$/.test(params.id)
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';
@import '~assets/style/common/main';

.divider {
  height: 0;
  border-top: 1px solid map-get($grey, lighten-2);
  text-align: center;

  span {
    color: map-get($grey, base);
    position: relative;
    top: -14px;
    background-color: map-get($grey, lighten-5);
  }
}
</style>
