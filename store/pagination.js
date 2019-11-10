export const state = () => ({
  totalPages: null,
  pageNumber: null
})

export const mutations = {
  setPageInfo(state, { totalPages, pageNumber }) {
    state.totalPages = totalPages
    state.pageNumber = pageNumber
  }
}

export const actions = {
  setPageInfo({ commit }, pageInfo) {
    commit('setPageInfo', pageInfo)
  },
  async pagedQuery(context, { axios, queryURL, contentAction }) {
    const data = await axios.$get(queryURL)
    context.dispatch(contentAction, data.content, { root: true })
    // update page info
    context.commit('setPageInfo', {
      totalPages: data.totalPages,
      pageNumber: data.pageable.pageNumber + 1
    })
  }
}
