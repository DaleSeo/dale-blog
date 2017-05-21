const router = require('express').Router()
const Article = require('../models/article')
const User = require('../models/user')

router.get('/', (req, res) => {
  Article.list().byPublished(true)
    .then(articles => res.render('index', {articles: articles}))
})

router.get('/admin', (req, res) => {
  Article.list()
    .then(articles => res.render('admin', {articles}))
})

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.render('login', {
      error: 'Please enter your email and password.'
    })
  }

  User.findOne({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    if (!user) {
      return res.render('login', {
        error: 'Incorrect email&password combination.'
      })
    }
    req.session.user = user
    res.redirect('/')
  })
  .catch(err => next(err))
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/')
})

router.get('/test', (req, res) => {
  res.send('<h1>Test</h1>')
})

module.exports = router
