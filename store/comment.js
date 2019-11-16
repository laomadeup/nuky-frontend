export const state = () => ({
  comments: []
})

export const mutations = {
  pushComments(state, comments) {
    state.comments.push(...comments)
  }
}

export const actions = {
  async loadComments(context, articleId) {
    let pageNumber = this.state.pagination.pageNumber
    pageNumber = pageNumber == null ? 1 : pageNumber
    const data = await this.$axios.$get(
      `/api/article-api/comment/articleComments/${articleId}/page/${pageNumber}`
    )
    context.dispatch('pagination/setPageInfo', data, { root: true })
    context.commit('pushComments', data.content)
  }
}
