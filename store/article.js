export const state = () => ({
  pageContent: []
})

export const mutations = {
  setpageContent(state, pageContent) {
    state.pageContent = pageContent
  }
}

export const actions = {
  setpageContent: (context, content) => {
    context.commit('setpageContent', content)
  }
}
