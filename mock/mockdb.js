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
      content: Random.paragraph(20, 25),
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
      const isReplayThisComment = Math.ceil(Math.random() * 3) % 3 === 0
      const comment = {
        id: commentId++,
        articleId: i,
        user: {
          username: Random.name(),
          avatar: Random.image('48x48', Random.color())
        },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        hasReply: isReplayThisComment,
        replies: []
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
    const comment = articleComments[j]
    const articleComentId = comment.id
    const commentSize = comment.hasReply ? Math.ceil(Math.random() * 10) + 5 : 0
    for (let k = 0; k < commentSize; k++) {
      const replyComment = new Conment(replyCommentId++, articleComentId)
      replyCommentArray.push(replyComment)

      const isReplayThisComent = Math.ceil(Math.random() * 5) % 5 === 0
      if (isReplayThisComent) {
        const replyLastComment = new Conment(
          replyCommentId++,
          articleComentId,
          replyComment.id
        )
        replyCommentArray.push(replyLastComment)
      }
    }
  }
  return replyCommentArray
})()

function Conment(id, articleComentId, replyCommentId) {
  return {
    id,
    commentId: articleComentId,
    user: {
      username: Random.name(),
      avatar: Random.image('32x32', Random.color())
    },
    createDate: moment(Random.datetime()).format(),
    content: Random.sentence(5, 15),
    replyTo: replyCommentId != null ? replyCommentId : articleComentId
  }
}
