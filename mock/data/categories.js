const { Random } = require('mockjs')
const MAX_LAYER = 3

function createSubCategories(parent) {
  const num = Math.ceil(Math.random() * 2) + 1
  for (let i = 1; i < num; i++) {
    const category = {
      id: parent.id * 10 + i,
      name: Random.word(3, 8),
      subCategories: [],
      amount: Math.ceil(Math.random() * 12) + 1,
      layer: parent.layer + 1
    }
    parent.subCategories.push(category)
    if (MAX_LAYER !== category.layer) {
      createSubCategories(category)
    }
  }
}

const categories = (() => {
  const categories = []
  for (let i = 1; i < 4; i++) {
    const category = {
      id: i,
      name: Random.word(3, 8),
      subCategories: [],
      amount: Math.ceil(Math.random() * 12) + 1,
      layer: 1
    }
    categories.push(category)
    createSubCategories(category)
  }
  return categories
})()

export { categories }
