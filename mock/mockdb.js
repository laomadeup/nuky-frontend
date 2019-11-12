const Mock = require('mockjs')
const Random = Mock.Random

module.exports = function() {
  return { articles }
}

const articles = (() => {
  const articles = []

  for (let i = 1; i <= 27; i++) {
    const article = {
      id: i,
      title: Random.sentence(5, 10),
      postDate: new Date(Random.datetime()).getTime(),
      content: Random.paragraph(5, 8),
      comments: []
    }
    const comments = [
      {
        id: i + 100,
        user: { username: Random.name() },
        createDate: new Date(Random.datetime()).getTime(),
        content: Random.sentence(5, 15),
        comments: [
          {
            id: i + 101,
            user: { username: Random.name() },
            createDate: new Date(Random.datetime()).getTime(),
            content: Random.sentence(5, 15),
            replayTo: i + 100
          },
          {
            id: i + 102,
            user: { username: Random.name() },
            createDate: new Date(Random.datetime()).getTime(),
            content: Random.sentence(5, 15),
            replayTo: i + 100
          }
        ]
      },
      {
        id: i + 103,
        user: { username: Random.name() },
        createDate: new Date(Random.datetime()).getTime(),
        content: Random.sentence(10, 15),
        replayTo: 1,
        comments: []
      }
    ]
    article.comments.push(...comments)
    articles.push(article)
  }

  return articles
})()
