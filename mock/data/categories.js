const { Random } = require('mockjs')
const MAX_LAYER = 3

function createSubCatetories(parent) {
  const num = Math.ceil(Math.random() * 2) + 1
  for (let i = 1; i < num; i++) {
    const category = {
      id: parent.id * 10 + i,
      name: Random.word(3, 8),
      subCatetories: [],
      layer: parent.layer + 1
    }
    parent.subCatetories.push(category)
    if (MAX_LAYER !== category.layer) {
      createSubCatetories(category)
    }
  }
}

const categories = (() => {
  const categories = []
  for (let i = 1; i < 5; i++) {
    const category = {
      id: i,
      name: Random.word(3, 8),
      subCatetories: [],
      layer: 1
    }
    categories.push(category)
    createSubCatetories(category)
  }
  return categories
})()

export { categories }
