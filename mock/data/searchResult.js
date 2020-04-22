import { posts } from './posts'

const results = []

function mark (content) {
  const contentLength = content.length
  const markLength = Math.floor(Math.random() * 5) + 5
  const markFrom = Math.max(Math.floor(Math.random() * contentLength) - markLength, 0)
  const markTo = markFrom + markLength

  return content.substring(0, markFrom) + '<mark>' + content.substring(markFrom, markTo) + '</mark>' +
    content.substring(markTo, contentLength)
}

for (let post of posts) {
  const content = delHtmlTag(post.content).substring(0, 400)
  const result = { id: post.id, title: mark(post.title), content: mark(content), publishDate: post.publishDate }
  results.push(result)
}

function delHtmlTag (str) {
  return str.replace(/<[^>]+>/g, '')//去掉所有的html标记
}

export default results
