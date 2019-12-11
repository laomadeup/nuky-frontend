export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    await dispatch('article/getPopularArticles')
    await dispatch('article/getCategories')
    await dispatch('article/getTags')
    console.log('get cached data')
  }
}
