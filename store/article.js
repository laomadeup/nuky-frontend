export const state = () => ({
  popularArticles: null,
  categories: null,
  categoryList: null,
  tags: null
})

export const mutations = {
  setPopularArticles(state, data) {
    state.popularArticles = data
  },
  setCategories(state, data) {
    state.categories = data
    state.categoryList = []
    pushData(state.categoryList, state.categories, 0)
  },
  setTags(state, data) {
    state.tags = data
  }
}

export const actions = {
  async getArticleAside({ commit }) {
    const [popular, categories, tags] = await Promise.all([
      this.$axios.$get('/api/article-api/articles/popular'),
      this.$axios.$get('/api/article-api/categories'),
      this.$axios.$get('/api/article-api/tags')
    ])

    commit('setPopularArticles', popular)
    commit('setTags', tags)
    commit('setCategories', categories)
  }
}

function pushData(categoryList, storeCategories, layer) {
  for (const category of storeCategories) {
    categoryList.push({
      id: category.id,
      name: category.name,
      layer,
      amount: category.amount
    })
    if (category.subCategories && category.subCategories.length > 0) {
      pushData(categoryList, category.subCategories, layer + 1)
    }
  }
}
