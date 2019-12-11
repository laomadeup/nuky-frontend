import { Random } from 'mockjs'
import moment from 'moment'
import { categories } from './categories'
import { tags } from './tags'
const articleSize = 30

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
