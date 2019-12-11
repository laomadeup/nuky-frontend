import { categories } from './categories'
const { Random } = require('mockjs')
const moment = require('moment')
const articleSize = 30
const tags = (function() {
  const tags = []
  tags.push({ id: 1, name: 'Java' })
  tags.push({ id: 2, name: 'Spring' })
  tags.push({ id: 3, name: 'Database' })
  tags.push({ id: 4, name: 'Oracle' })
  tags.push({ id: 5, name: 'MySQL' })
  tags.push({ id: 6, name: 'Tomcat' })
  tags.push({ id: 7, name: 'JavaScript' })
  tags.push({ id: 8, name: 'Shell' })
  tags.push({ id: 9, name: 'SpringBoot' })
  tags.push({ id: 10, name: 'SpringCloud' })
  tags.push({ id: 11, name: 'Dev' })
  tags.push({ id: 12, name: 'Ops' })
  tags.push({ id: 13, name: 'Linux' })
  tags.push({ id: 14, name: 'ElasticSearch' })
  tags.push({ id: 15, name: 'WEB' })
  return tags
})()

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
  content += `<pre><code class="language-javascript">function test(){\n  console.log('test', 123);\n}</code></pre>`
  content += '<blockquote><p>Java Code</p></blockquote>'
  content += `<pre><code class="language-java">public static void main(String[] args){\n  System.out.println("Test");\n}</code></pre>`
  // 3rd paragraph
  content += '<br><h4>3.Table</h4>'
  content +=
    '<figure class="table"><table><thead><tr><th>T1</th><th>T2</th><th>T3</th><th>T4</th><th>T5</th></tr></thead><tbody><tr><td>ggg</td><td>ggg</td><td>ggg</td><td>ggg</td><td>ggg</td></tr><tr><td>sdq</td><td>qwe</td><td>das</td><td>dasd</td><td>qwe</td></tr></tbody></table></figure>'

  return content
}

const genRamdomTags = () => {
  const ramdomTags = []
  const number = Math.floor(Math.random() * 3) + 2
  const fromIndex = Math.floor(Math.random() * tags.length)
  for (let i = 0; i < number; i++) {
    ramdomTags.push(tags[(fromIndex + i * 2) % tags.length])
  }
  return ramdomTags
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
      tags: genRamdomTags(),
      category: categories[Math.floor(Math.random() * categories.length)],
      comments: []
    }

    articles.push(article)
  }

  return articles
})()

export { articles }
