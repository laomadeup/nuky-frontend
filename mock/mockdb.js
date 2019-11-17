const Mock = require('mockjs')
const Random = Mock.Random
const moment = require('moment')
const articleSize = 27

module.exports = function() {
  return { articles, articleComments, replyComments }
}

const articles = (() => {
  const articles = []
  for (let i = 1; i <= articleSize; i++) {
    const article = {
      id: i,
      title: Random.sentence(5, 10),
      postDate: moment(Random.datetime()).format(),
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
  for (let i = 1; i <= articleSize; i++) {
    const thisGenComments = []
    const commentSize = Math.floor(Math.random() * 10)
    for (let j = 0; j < commentSize; j++) {
      const isReplayThisComment = Math.ceil(Math.random() * 3) % 1 === 0
      let replyCommentSize = Math.ceil(Math.random() * 10) + 5
      if (!isReplayThisComment) {
        replyCommentSize = 0
      }
      const comment = {
        id: commentId++,
        articleId: i,
        user: { username: Random.name() },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        replyCommentSize
      }
      thisGenComments.push(comment)
    }

    articleComments.push(...thisGenComments)
  }
  return articleComments
})()

const replyComments = (() => {
  const replyCommentArray = []
  let replyCommentId = 10000
  // replay replyComments
  for (let j = 0; j < articleComments.length; j++) {
    const articleComentId = articleComments[j].id
    const commentSize = articleComments[j].replyCommentSize
    for (let k = 0; k < commentSize; k++) {
      const replyComment = {
        id: articleComments,
        commentId: articleComentId,
        user: { username: Random.name() },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        replyTo: articleComentId
      }
      replyCommentArray.push(replyComment)
      replyCommentId++

      const isReplayThisComent = Math.ceil(Math.random() * 4) % 1 === 0
      if (!isReplayThisComent) {
        continue
      }

      const replyLastComment = {
        id: replyCommentId,
        belongCommentId: articleComentId,
        user: { username: Random.name() },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        replyTo: replyCommentId - 1
      }
      replyCommentArray.push(replyLastComment)
      replyCommentId++
    }
  }
  return replyCommentArray
})()
