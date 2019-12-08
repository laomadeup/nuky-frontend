const PAGE_FLAG = '_page'
const PAGE_LIMIT_FLAG = '_limit'
function isPagedQuery(req) {
  return req.url.includes(PAGE_FLAG)
}

function wrap(req, res) {
  if (isPagedQuery(req)) {
    console.log('wrapper : pageRes')
    pageRes(req, res)
  } else {
    res.jsonp(res.locals.data)
  }
}

function pageRes(req, res) {
  const queryString = req.url.substring(req.url.indexOf('?') + 1)
  const queries = require('querystring').parse(queryString)
  const totalCount = res.get('X-Total-Count')
  res.jsonp({
    content: res.locals.data,
    totalPages: Math.ceil(totalCount / Number(queries[PAGE_LIMIT_FLAG])),
    pageable: { pageNumber: Number(queries[PAGE_FLAG]) - 1 }
  })
}

export default wrap
