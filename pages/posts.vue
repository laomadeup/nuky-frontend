<template>
  <div>
    <div v-if="posts.length === 0">
      Nothing here...
      <br />
      <nuxt-link :to="{ name: 'index' }">back to home page>></nuxt-link>
    </div>
    <div v-else>
      <article
        v-for="(post, index) in posts"
        :key="index"
        ref="postBox"
        class="post-page-item mb-4 pb-2"
        :index="index"
      >
        <v-tooltip left content-class="py-0 caption">
          <template v-slot:activator="{ on }">
            <v-icon
              v-if="post.isSticky"
              class="sticky verticalalign-middle"
              v-on="on"
              v-text="mdiPin"
            />
          </template>
          <span>Pinned</span>
        </v-tooltip>

        <nuxt-link
          tag="section"
          class="post-body"
          :to="{ name: 'post-id', params: { id: post.id } }"
        >
          <h4 class="title grey--text text--darken-4">
            {{ post.title }}
          </h4>
          <p class="post-excerpt my-2">{{ post.excerpt }}</p>
        </nuxt-link>
        <post-info :tags="post.tags" :categories="post.categories" />
        <section class="artcile-footer my-2">
          <v-tooltip bottom content-class="py-0 caption">
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small v-text="mdiCalendarTextOutline" />
                <time class="verticalalign-middle">
                  {{ $moment(post.publishDate).format('YYYY-MM-DD') }}
                </time>
              </section>
            </template>
            <span>post date</span>
          </v-tooltip>

          <v-tooltip bottom content-class="py-0 caption">
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small v-text="mdiBookOpen" />
                <span class="verticalalign-middle">
                  {{ post.views }}
                </span>
              </section>
            </template>
            <span>views</span>
          </v-tooltip>

          <v-tooltip bottom content-class="py-0 caption">
            <template v-slot:activator="{ on }">
              <section class="d-inline-block mr-4" v-on="on">
                <v-icon small v-text="mdiCommentMultiple" />
                <span class="verticalalign-middle">
                  {{ post.commentAmount }}
                </span>
              </section>
            </template>
            <span>comments</span>
          </v-tooltip>
        </section>
        <v-divider class="mt-4" />
      </article>
      <v-pagination v-model="pageNumber" :length="totalPages" @input="toPage" />
      <v-overlay :value="overlay">
        <v-progress-circular
          color="primary"
          indeterminate
          size="48"
        ></v-progress-circular>
      </v-overlay>
    </div>
  </div>
</template>

<script>
import {
  mdiBookOpen,
  mdiCalendarTextOutline,
  mdiCommentMultiple,
  mdiPin
} from '@mdi/js'
import PostInfo from '@/components/blog/post/PostInfo'

export default {
  layout: 'BlogAside',
  components: {
    PostInfo
  },
  async asyncData({ query, $axios }) {
    // paged query ariticle list
    const page = query.page ? query.page : 1
    const { content, totalPages, pageNumber } = await $axios.$get(
      `/api/post-api/posts`,
      {
        params: {
          page
        }
      }
    )
    return {
      posts: content,
      totalPages,
      pageNumber
    }
  },
  data() {
    return {
      overlay: false,
      mdiCalendarTextOutline,
      mdiBookOpen,
      mdiCommentMultiple,
      mdiPin,
      pageNumber: 1,
      totalPages: 0,
      posts: []
    }
  },
  methods: {
    async toPage() {
      this.overlay = true
      const { content, totalPages, pageNumber } = await this.$axios.$get(
        `/api/post-api/posts`,
        {
          params: {
            page: this.pageNumber
          }
        }
      )
      this.posts = content
      this.totalPages = totalPages
      this.pageNumber = pageNumber
      this.overlay = false
    }
  },
  head() {
    return {
      title: this.pageNumber === 1 ? 'Home' : 'Posts',
      meta: [
        {
          hid: 'Posts',
          name: 'Posts',
          content: 'Posts'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vuetify/src/styles/styles';

.post-page-item {
  position: relative;

  .sticky {
    position: absolute;
    left: -2rem;
    top: 0.3rem;
  }

  .post-body {
    cursor: pointer;

    .post-excerpt {
      height: 3rem;
      line-height: 1.5rem;
      overflow: hidden;
      color: map-get($grey, darken-3);
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    &:hover {
      .title {
        color: map-get($blue, darken-2) !important;
        text-decoration: underline !important;
      }
    }
  }

  .artcile-footer {
    font-size: 0.85rem;

    span {
      margin-right: 6px;
    }
  }
}
</style>
