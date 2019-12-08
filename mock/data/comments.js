import { articles } from './articles'

const { Random } = require('mockjs')
const moment = require('moment')

export const articleComments = (() => {
  const articleComments = []
  let commentId = 1000
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    const thisGenComments = []
    for (let j = 0; j < article.commentAmount; j++) {
      const hasReply = Math.ceil(Math.random() * 5) % 2 === 0
      const comment = {
        id: commentId++,
        articleId: article.id,
        user: {
          username: Random.name(),
          avatar: Random.image('48x48', Random.color())
        },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        hasReply,
        replies: []
      }
      thisGenComments.push(comment)
    }

    articleComments.push(...thisGenComments)
  }
  return articleComments
})()

export const replyComments = (() => {
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

      const isReplayThisComent = Math.ceil(Math.random() * 2) % 2 === 0
      if (isReplayThisComent) {
        const replyLastComment = new Conment(
          replyCommentId++,
          articleComentId,
          replyComment
        )
        replyCommentArray.push(replyLastComment)
      }
    }
  }
  return replyCommentArray
})()

function Conment(id, articleComentId, replyComment) {
  return {
    id,
    commentId: articleComentId,
    user: {
      username: Random.name(),
      avatar: Random.image('32x32', Random.color())
    },
    createDate: moment(Random.datetime()).format(),
    content: Random.sentence(5, 15),
    replyComment
  }
}
