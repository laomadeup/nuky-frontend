export const state = () => ({
  pageContent: [],
  popularArticles: { fetchTime: null, data: [] },
  article: null
})

export const mutations = {
  setPageContent(state, pageContent) {
    state.pageContent = pageContent
  },
  setPopularArticles(state, data) {
    state.popularArticles.fetchTime = new Date().getTime()
    state.popularArticles.data = data
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
  async getArticle({ commit }, id) {
    const data = await this.$axios.$get('/api/article-api/article/' + id)
    commit('setArticle', data)
  },
  async pagedQueryArticles(context, pageNumber) {
    const data = await this.$axios.$get(
      `/api/article-api/articles/page/${pageNumber}`
    )
    context.dispatch('pagination/setPageInfo', data, { root: true })
    context.commit('setPageContent', data.content)
  }
}
