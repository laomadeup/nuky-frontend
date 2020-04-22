const PAGE_FLAG = '_page'
const PAGE_LIMIT_FLAG = '_limit'
const SINGULAR_FLAG = '_singular'

function isPagedQuery (req) {
  return req.url.includes(PAGE_FLAG) || !!req.query._page
}

function isSingularQuery (req) {
  return req.url.includes(SINGULAR_FLAG) || !!req.query._singular
}

function wrap (req, res) {
  if (isPagedQuery(req)) {
    console.log('wrapper : pageRes')
    pageRes(req, res)
  } else if (isSingularQuery(req) && res.locals.data instanceof Array) {
    res.jsonp(res.locals.data[0])
  } else {
    res.jsonp(res.locals.data)
  }
}

function pageRes (req, res) {
  const queryString = req.url.substring(req.url.indexOf('?') + 1)
  const queries = require('querystring').parse(queryString)
  const totalCount = res.get('X-Total-Count')
  const pageSize = Number(queries[PAGE_LIMIT_FLAG])
  res.jsonp({
    content: res.locals.data,
    totalElements: totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
    pageNumber: Number(queries[PAGE_FLAG]),
    pageSize
  })
}

export default wrap
