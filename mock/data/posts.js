import faker from 'faker'
import moment from 'moment'
import { allCategories } from './categories'
import tags from './tags'

const postSize = 30

const buildPostConente = () => {
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
  content += '<blockquote><p>HTML code</p></blockquote>'
  content += `<pre><pre><code class="language-Markup">&lt;script&gt;\n alert(1);\n &lt;/script&gt;</code></pre></pre>`
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

const posts = (() => {
  const posts = []
  for (let i = 1; i <= postSize; i++) {
    const categoryNum = faker.random.number({min:1, max:3})
    const categories = []
    for (let j = 0; j < categoryNum; j++) {
      const item = faker.random.arrayElement(allCategories)
      categories.push({ id: item.id, name: item.name })
    }
    const post = {
      id: i,
      title: faker.lorem.sentence(),
      publishDate: moment(faker.date.past(1)).format(),
      excerpt: faker.lorem.sentences(),
      content: buildPostConente(),
      commentAmount: faker.random.number({ min: 25, max: 40 }),
      views: faker.random.number({ min: 0, max: 10000 }),
      tags: genRamdomTags(),
      categories,
      comments: []
    }

    posts.push(post)
  }

  posts[0].isSticky=true
  return posts
})()

const popularPosts = (() => {
  return posts.filter((value, index) => index < 10).map((value) => {
    return { id: value.id, title: value.title, publishDate: value.publishDate }
  })
})()

export { posts, popularPosts }
