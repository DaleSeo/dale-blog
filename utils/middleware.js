exports.logReq = function (req, res, next) {
  console.log('#################################')
  console.log('#req.url:', req.url)
  if (req.session) console.log('#req.session:', req.session)
  if (req.user) console.log('#req.user:', req.user)
  if (req.params) console.log('#req.params:', req.params)
  if (req.body) console.log('#req.body:', req.body)
  console.log('#################################')
  next()
}

const publicUrls = ['/login', '/signup', '/error']

exports.checkAuth = (req, res, next) => {
  if (publicUrls.indexOf(req.url) > -1 || (req.session && req.user)) {
    res.locals.user = req.user
    return next()
  } else {
    return res.redirect('/login')
  }
}
