export const state = () => ({
  popularArticles: [],
  categories: []
})

export const mutations = {
  setPopularArticles(state, data) {
    state.popularArticles = data
  },
  setCategories(state, data) {
    state.categories = data
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
  }
}
