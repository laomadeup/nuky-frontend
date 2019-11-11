const Mock = require('mockjs')
const Random = Mock.Random

router.render = (req, res) => {
  res.jsonp({
    body: res.locals.data
  })
}

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
