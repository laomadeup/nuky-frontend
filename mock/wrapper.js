const PAGE_FLAG = '_page'
const PAGE_LIMIT = 5

function isPagedQuery(req) {
  return req.url.includes(PAGE_FLAG)
}

function wrap(req, res) {
  if (isPagedQuery(req)) {
    console.log('wrapper : pageRes')
    pageRes(req, res)
  }
}

function pageRes(req, res) {
  const url = req.url
  const queryString = url.substring(url.indexOf('?') + 1)
  const queries = require('querystring').parse(queryString)
  const curPage = Number(queries[PAGE_FLAG])
  const pageable = { pageNumber: curPage - 1 }
  const totalCount = res.get('X-Total-Count')
  const data = res.locals.data
  const totalPages = Math.ceil(totalCount / PAGE_LIMIT)
  res.jsonp({
    content: data,
    totalPages,
    pageable
  })
}

module.exports = wrap
