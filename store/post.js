export const state = () => ({
  popularPosts: null,
  categories: null,
  categoryList: null,
  tags: null
})

export const mutations = {
  setPopularPosts(state, data) {
    state.popularPosts = data
  },
  setCategories(state, data) {
    state.categories = data
    state.categoryList = []
    pushData(state.categoryList, state.categories, 0)
  },
  setTags(state, data) {
    state.tags = data
  }
}

export const actions = {
  async getPostAside({ commit }) {
    const [popular, categories, tags] = await Promise.all([
      this.$axios.$get('/api/post-api/posts/popular'),
      this.$axios.$get('/api/post-api/categories'),
      this.$axios.$get('/api/post-api/tags')
    ])

    commit('setPopularPosts', popular)
    commit('setTags', tags)
    commit('setCategories', categories)
  },
  async getCategories({ commit }) {
    const data = await this.$axios.$get('/api/post-api/categories')
    commit('setCategories', data)
  },
  async getTags({ commit }) {
    const data = await this.$axios.$get('/api/post-api/tags')
    commit('setTags', data)
  }
}

function pushData(categoryList, storeCategories, layer) {
  for (const category of storeCategories) {
    categoryList.push({
      id: category.id,
      name: category.name,
      layer,
      amount: category.amount
    })
    if (category.children && category.children.length > 0) {
      pushData(categoryList, category.children, layer + 1)
    }
  }
}
