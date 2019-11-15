const Mock = require('mockjs')
const Random = Mock.Random
const articleSize = 27

module.exports = function() {
  return { articles, articleComments }
}

const articles = (() => {
  const articles = []

  for (let i = 1; i <= articleSize; i++) {
    const article = {
      id: i,
      title: Random.sentence(5, 10),
      postDate: new Date(Random.datetime()).getTime(),
      content: Random.paragraph(5, 8),
      comments: []
    }

    articles.push(article)
  }

  return articles
})()

const articleComments = (() => {
  const articleComments = []
  let commentId = 1000
  let replyCommentId = 10000
  for (let i = 1; i <= articleSize; i++) {
    const thisGenComments = []
    const commentSize = Math.floor(Math.random() * 10)
    for (let j = 0; j < commentSize; j++) {
      const comment = {
        id: commentId++,
        articleId: i,
        user: { username: Random.name() },
        createDate: new Date(Random.datetime()).getTime(),
        content: Random.sentence(5, 15),
        replyComments: []
      }
      thisGenComments.push(comment)
    }
    // replay replyComments
    for (let j = 0; j < thisGenComments.length; j++) {
      const isReplayThisComment = Math.ceil(Math.random() * 3) % 1 === 0
      if (!isReplayThisComment) {
        continue
      }

      const articleComentId = thisGenComments[j].id
      const commentSize = Math.ceil(Math.random() * 10) + 5
      for (let k = 0; k < commentSize; k++) {
        const replyComment = {
          id: replyCommentId,
          user: { username: Random.name() },
          createDate: new Date(Random.datetime()).getTime(),
          content: Random.sentence(5, 15),
          replyTo: articleComentId
        }
        thisGenComments[j].replyComments.push(replyComment)
        replyCommentId++

        const isReplayThisComent = Math.ceil(Math.random() * 4) % 1 === 0
        if (!isReplayThisComent) {
          continue
        }

        const replyLastComment = {
          id: replyCommentId,
          user: { username: Random.name() },
          createDate: new Date(Random.datetime()).getTime(),
          content: Random.sentence(5, 15),
          replyTo: replyCommentId - 1
        }
        thisGenComments[j].replyComments.push(replyLastComment)
        replyCommentId++
      }
    }
    articleComments.push(...thisGenComments)
  }
  return articleComments
})()
