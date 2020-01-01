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
  async getArticleAside({ commit }) {
    const [popular, categories, tags] = await Promise.all([
      this.$axios.$get('/api/article-api/articles/popular'),
      this.$axios.$get('/api/article-api/categories'),
      this.$axios.$get('/api/article-api/tags')
    ])

    commit('setPopularArticles', popular)
    commit('setTags', categories)
    commit('setCategories', tags)
  }
}
