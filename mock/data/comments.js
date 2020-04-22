import faker from 'faker'
import moment from 'moment'
import { posts } from './posts'

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

function markReply (postComments) {
  const total = postComments.length
  for (let i = 1; i < total; i++) {
    const isThisReply = faker.random.boolean() && faker.random.boolean()
    if (isThisReply) {
      const replayIndex = faker.random.number({ min: 0, max: i - 1 })
      postComments[i].replyComment = {
        id: postComments[replayIndex].id,
        username: postComments[replayIndex].user.username,
        content: postComments[replayIndex].content
      }
    }
  }
}

const postComments = (() => {
  const postComments = []
  let commentId = 1000
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i]
    const thisPostComments = []
    for (let j = 0; j < post.commentAmount; j++) {
      const comment = {
        id: commentId++,
        postId: post.id,
        user: {
          username: faker.name.findName(),
          avatar: faker.random.arrayElement(allColors)
        },
        createDate: moment(faker.date.past(1)).format(),
        content: faker.lorem.sentences(),
        like: faker.random.number({ min: 10, max: 16000 }),
        dislike: faker.random.number({ min: 0, max: 999 })
      }
      thisPostComments.push(comment)
    }
    markReply(thisPostComments)
    postComments.push(...thisPostComments)
  }

  return postComments
})()

export default postComments
