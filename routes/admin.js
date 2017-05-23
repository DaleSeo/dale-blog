const router = require('express').Router()
const Article = require('../models/article')

router.get('/', (req, res) => {
  Article.list()
    .then(articles => res.render('article/list', {articles}))
})

module.exports = router
