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
    '<figure class="table"><table><thead><tr><th>First Name</th><th>Last' +
    ' Name</th><th>Age</th></tr></thead><tbody><tr><td>Dickerson</td><td>Macdonald</td><td>40</td></tr><tr><td>Larsen</td><td>Shaw</td><td>21</td></tr><tr><td>Geneva</td><td>Wilson</td><td>89</td></tr><tr><td>Jami</td><td>Carney</td><td>38</td></tr></tbody></table></figure>'

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
    const category = categories[Math.floor(Math.random() * categories.length)]
    const article = {
      id: i,
      title: Random.sentence(5, 10),
      postDate: moment(Random.datetime()).format(),
      description: Random.paragraph(2),
      content: buildArticleConente(),
      commentAmount: Math.floor(Math.random() * 25) + 10,
      views: Math.floor(Math.random() * 15),
      likes: Math.floor(Math.random() * 15),
      tags: genRamdomTags(),
      category: { id: category.id, name: category.name },
      comments: []
    }

    articles.push(article)
  }

  return articles
})()

const popularArticles = (() => {
  return articles
    .filter((value, index) => index < 10)
    .map((value) => {
      return { id: value.id, title: value.title }
    })
})()

export { articles, popularArticles }
