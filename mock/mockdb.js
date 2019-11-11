const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function() {
  return { articles }
}

const articles = (() => {
  const articles = []

  for (let i = 1; i <= 15; i++) {
    articles.push({
      id: i,
      title: Random.word(4, 10)
    })
  }

  return articles
})()
