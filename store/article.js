export const state = () => ({
  pageContent: [],
  popularArticles: [],
  article: null
})

export const mutations = {
  setPageContent(state, pageContent) {
    state.pageContent = pageContent
  },
  setPopularArticles(state, popularArticles) {
    state.popularArticles = popularArticles
  },
  setArticle(state, article) {
    state.article = article
  }
}

export const actions = {
  setPageContent(context, content) {
    context.commit('setPageContent', content)
  },
  async getPopularArticles({ commit }) {
    const data = await this.$axios.$get('/api/article-api/articles/popular')
    commit('setPopularArticles', data)
  },
  async getArticle({ commit }, { id }) {
    const data = await this.$axios.$get('/api/article-api/article/' + id)
    commit('setArticle', data)
  }
}
