export const state = () => ({
  popularArticles: { fetchTime: null, data: [] }
})

export const mutations = {
  setPopularArticles(state, data) {
    state.popularArticles.fetchTime = new Date().getTime()
    state.popularArticles.data = data
  }
}

export const actions = {
  async getPopularArticles({ commit }) {
    const data = await this.$axios.$get('/api/article-api/articles/popular')
    commit('setPopularArticles', data)
  }
}
