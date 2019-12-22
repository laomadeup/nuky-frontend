import faker from 'faker'
import moment from 'moment'
import { articles } from './articles'

const allColors = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'blue-grey',
  'grey'
]

function markReply(articleComments) {
  const total = articleComments.length
  for (let i = 1; i < total; i++) {
    const isThisReply = faker.random.boolean() && faker.random.boolean()
    if (isThisReply) {
      const replayIndex = faker.random.number({ min: 0, max: i - 1 })
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
          username: faker.name.findName(),
          avatar: faker.random.arrayElement(allColors)
        },
        createDate: moment(faker.date.past(1)).format(),
        content: faker.lorem.sentences(),
        like: faker.random.number({ min: 0, max: 1500 }),
        dislike: faker.random.number({ min: 0, max: 150 })
      }
      thisArticleComments.push(comment)
    }
    markReply(thisArticleComments)
    articleComments.push(...thisArticleComments)
  }

  return articleComments
})()
