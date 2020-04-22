const tags = (function () {
  const tags = []
  tags.push({ name: 'Java' })
  tags.push({ name: 'Spring' })
  tags.push({ name: 'Database' })
  tags.push({ name: 'Oracle' })
  tags.push({ name: 'MySQL' })
  tags.push({ name: 'Tomcat' })
  tags.push({ name: 'Nginx' })
  tags.push({ name: 'JavaScript' })
  tags.push({ name: 'Shell' })
  tags.push({ name: 'Spring Boot' })
  tags.push({ name: 'Spring Cloud' })
  tags.push({ name: 'Dev' })
  tags.push({ name: 'Ops' })
  tags.push({ name: 'Linux' })
  tags.push({ name: 'ElasticSearch' })
  tags.push({ name: 'WEB' })

  tags.forEach((tag, index) => {
    tag.id = index + 1
    tag.slug = tag.name.toLowerCase().replace(/[\s]/g, '-')
  })
  return tags
})()

export default tags
