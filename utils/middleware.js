exports.logReq = function (req, res, next) {
  console.log('#################################')
  console.log('#req.url:', req.url)
  console.log('#req.session:', req.session)
  console.log('#req.user:', req.user)
  console.log('#req.params:', req.params)
  console.log('#req.body:', req.body)
  console.log('#################################')
  next()
}

const publicUrls = ['/login', '/signup', '/error']

exports.checkAuth = (req, res, next) => {
  if (publicUrls.indexOf(req.url) > -1 || (req.session && req.user)) {
    return next()
  } else {
    return res.redirect('/login')
  }
}
