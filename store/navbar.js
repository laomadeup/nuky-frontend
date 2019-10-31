const state = () => ({
  menus: [
    { routerName: 'articles', name: 'Articles' },
    { routerName: 'photos', name: 'Photos' },
    { routerName: 'about', name: 'About Me' }
  ]
})

const mutations = {}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
