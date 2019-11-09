export const state = () => ({
  pageContent: []
})

export const mutations = {
  setpageContent(state, pageContent) {
    state.pageContent = pageContent
  }
}

export const actions = {
  setpageContent: (context, { content, totalPages, pageable }) => {
    context.commit('setpageContent', content)
    context.dispatch(
      'pagination/setPageInfo',
      {
        totalPages,
        pageNumber: pageable.pageNumber + 1
      },
      { root: true }
    )
  }
}
