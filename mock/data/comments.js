import { articles } from './articles'

const { Random } = require('mockjs')
const moment = require('moment')

function markReply(articleComments) {
  const total = articleComments.length
  for (let i = 1; i < total; i++) {
    const isThisReply = Math.floor(Math.random() * 4) === 0
    if (isThisReply) {
      const replayIndex = Math.ceil(Math.random() * i - 1)
      articleComments[i].replyComment = {
        id: articleComments[replayIndex].id,
        username: articleComments[replayIndex].user.username,
        content: articleComments[replayIndex].content
      }
    }
  }
}

export const articleComments = (() => {
  const articleComments = []
  let commentId = 1000
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    const thisArticleComments = []
    for (let j = 0; j < article.commentAmount; j++) {
      const comment = {
        id: commentId++,
        articleId: article.id,
        user: {
          username: Random.name(),
          avatar: Random.image('48x48', Random.color())
        },
        createDate: moment(Random.datetime()).format(),
        content: Random.sentence(5, 15),
        like:
          Math.floor(Math.random() * 4) === 0
            ? Math.floor(Math.random() * 15) + 3
            : 0,
        dislike:
          Math.floor(Math.random() * 4) === 0
            ? Math.floor(Math.random() * 5)
            : 0
      }
      thisArticleComments.push(comment)
    }
    markReply(thisArticleComments)
    articleComments.push(...thisArticleComments)
  }

  return articleComments
})()
