export const state = () => ({})

export const mutations = {}

export const actions = {
  async nuxtServerInit({ dispatch }) {
    console.log('get popular articles...')
    await dispatch('article/getPopularArticles')
    console.log('get categories...')
    await dispatch('article/getCategories')
  }
}
