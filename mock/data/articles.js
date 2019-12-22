import faker from 'faker'
import moment from 'moment'
import { categories } from './categories'
import { tags } from './tags'

const articleSize = 30

const buildArticleConente = () => {
  let content = ''
  // 1st paragraph
  content += '<h3>1.Intorducion</h3>'
  content += '<p>' + faker.lorem.paragraphs(5, '</p><p>') + '</p>'
  content +=
    '<p><code>Test</code><mark class="marker-pink">JavaScript Code</mark><mark class="marker-green">Java Code</mark></p>'
  // 2nd paragraph
  content += '<br><h3>2.Code</h3>'
  content += '<blockquote><p>JavaScript Code</p></blockquote>'
  content += `<pre><code class="language-javascript">function test(){\n  console.log('test', 123);\n}</code></pre>`
  content += '<blockquote><p>Java Code</p></blockquote>'
  content += `<pre><code class="language-java">public static void main(String[] args){\n  System.out.println("Test");\n}</code></pre>`
  // 3rd paragraph
  content += '<br><h3>3.Table</h3>'
  content +=
    '<figure class="table"><table><thead><tr><th>First Name</th><th>Last' +
    ' Name</th><th>Age</th></tr></thead><tbody><tr><td>Dickerson</td><td>Macdonald</td><td>40</td></tr><tr><td>Larsen</td><td>Shaw</td><td>21</td></tr><tr><td>Geneva</td><td>Wilson</td><td>89</td></tr><tr><td>Jami</td><td>Carney</td><td>38</td></tr></tbody></table></figure>'

  return content
}

const genRamdomTags = () => {
  const ramdomTags = []
  const number = faker.random.number({ min: 3, max: 5 })
  for (let i = 0; i < number; i++) {
    ramdomTags.push(faker.random.arrayElement(tags))
  }
  return ramdomTags
}

const articles = (() => {
  const articles = []
  for (let i = 1; i <= articleSize; i++) {
    const category = faker.random.arrayElement(categories)
    const article = {
      id: i,
      title: faker.lorem.sentence(),
      postDate: moment(faker.date.past(1)).format(),
      description: faker.lorem.sentences(),
      content: buildArticleConente(),
      commentAmount: faker.random.number({ min: 25, max: 40 }),
      views: faker.random.number({ min: 0, max: 10000 }),
      likes: faker.random.number({ min: 0, max: 10000 }),
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
