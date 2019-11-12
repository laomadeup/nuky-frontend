const PAGE_FLAG = '_page'

function isPagedQuery(req) {
  return req.url.includes(PAGE_FLAG)
}

function wrap(req, res) {
  if (isPagedQuery(req)) {
    console.log('wrapper : pageRes')
    pageRes(res)
  }
}

function pageRes(res) {
  // res.getHeaders()['x-total-count']
  const data = res.locals.data
  res.jsonp({
    content: data,
    totalPages: 3,
    curPage: 1
  })
}

module.exports = wrap
