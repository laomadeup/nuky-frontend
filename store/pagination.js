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
  setPageInfo({ commit }, { totalPages, pageable }) {
    commit('setPageInfo', {
      totalPages,
      pageNumber: pageable.pageNumber + 1
    })
  }
}
