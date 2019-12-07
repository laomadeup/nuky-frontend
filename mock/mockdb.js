const { Random } = require('mockjs')
const moment = require('moment')
const articleSize = 27

module.exports = function() {
  return { articles, articleComments, replyComments }
}

const buildArticleConente = () => {
  let content = ''
  // 1st paragraph
  content += '<h4>1.Intorducion</h4>'
  content += '<p>' + Random.paragraph(10, 15) + '</p>'
  content +=
    '<p><code>Test</code><mark class="marker-pink">JavaScript Code</mark><mark class="marker-green">Java Code</mark></p>'
  // 2nd paragraph
  content += '<br><h4>2.Code</h4>'
  content += '<blockquote><p>JavaScript Code</p></blockquote>'
  content += `<pre><code class="language-javascript line-numbers match-braces rainbow-braces">function test(){\n  console.log('test', 123);\n}</code></pre>`
  content += '<blockquote><p>Java Code</p></blockquote>'
  content += `<pre><code class="language-java line-numbers match-braces rainbow-braces">public static void main(String[] args){\n  System.out.println("Test");\n}</code></pre>`
  // 3rd paragraph
  content += '<br><h4>3.Table</h4>'
  content +=
    '<figure class="table"><table><thead><tr><th>T1</th><th>T2</th><th>T3</th><th>T4</th><th>T5</th></tr></thead><tbody><tr><td>ggg</td><td>ggg</td><td>ggg</td><td>ggg</td><td>ggg</td></tr><tr><td>sdq</td><td>qwe</td><td>das</td><td>dasd</td><td>qwe</td></tr></tbody></table></figure>'

  return content
}

const articles = (() => {
  const articles = []
  for (let i = 1; i <= articleSize; i++) {
    const article = {
      id: i,
      title: Random.sentence(5, 10),
      postDate: moment(Random.datetime()).format(),
      description: Random.paragraph(5, 10),
      content: buildArticleConente(),
      commentAmount: Math.floor(Math.random() * 15),
      views: Math.floor(Math.random() * 15),
      likes: Math.floor(Math.random() * 15),
      comments: []
    }

    articles.push(article)
  }

  return articles
})()

const articleComments = (() => {
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
