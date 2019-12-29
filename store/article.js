export const state = () => ({
  popularArticles: null,
  categories: null,
  tags: null
})

export const mutations = {
  setPopularArticles(state, data) {
    state.popularArticles = data
  },
  setCategories(state, data) {
    state.categories = data
  },
  setTags(state, data) {
    state.tags = data
  }
}

export const actions = {
  async getPopularArticles({ commit }) {
    const data = await this.$axios.$get('/api/article-api/articles/popular')
    commit('setPopularArticles', data)
  },
  async getCategories({ commit }) {
    const data = await this.$axios.$get('/api/article-api/categories')
    commit('setCategories', data)
  },
  async getTags({ commit }) {
    const data = await this.$axios.$get('/api/article-api/tags')
    commit('setTags', data)
  }
}
