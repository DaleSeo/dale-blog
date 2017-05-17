const router = require('express').Router()
const Article = require('../models/article')

router.get('/', (req, res) => {
  Article.list().byPublished(true)
    .then(articles => res.render('index', {articles: articles}))
})

router.get('/admin', (req, res) => {
  Article.list()
    .then(articles => res.render('admin', {articles}))
})

exports.admin = function (req, res, next) {
  req.models.Article.list((error, articles) => {
    if (error) return next(error)
    res.render('admin', {articles: articles})
  })
}

router.get('/test', (req, res) => {
  res.send('<h1>Test</h1>')
})

module.exports = router
