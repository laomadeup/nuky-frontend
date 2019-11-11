export const state = () => ({
  pageContent: [],
  popularArticles: []
})

export const mutations = {
  setPageContent(state, pageContent) {
    state.pageContent = pageContent
  },
  setPopularArticles(state, popularArticles) {
    state.popularArticles = popularArticles
  }
}

export const actions = {
  setPageContent(context, content) {
    context.commit('setPageContent', content)
  },
  async loadPopularArticles({ commit }) {
    const data = await this.$axios.$get('/api/article-api/articles/popular')
    commit('setPopularArticles', data)
  }
}
