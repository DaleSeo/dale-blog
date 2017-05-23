const router = require('express').Router()
const Article = require('../models/article')

router.get('/', (req, res) => {
  Article.list().byPublished(true)
    .then(articles => res.render('index', {articles: articles}))
})

router.get('/test', (req, res) => {
  res.send('<h1>Test</h1>')
})

module.exports = router
