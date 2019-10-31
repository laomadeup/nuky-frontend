export const state = () => ({
  recentArticles: []
})

export const mutations = {
  setRecentArticles(state, recentArticles) {
    state.recentArticles = recentArticles
  }
}

export const actions = {
  setRecentArticles: ({ commit }, recentArticles) => {
    commit('setRecentArticles', recentArticles)
  }
}
