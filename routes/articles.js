const router = require('express').Router()
const Article = require('../models/article')

router.get('/add', (req, res, next) => {
  res.render('article/edit')
})

router.post('/add', (req, res, next) => {
  if (!req.body.title || !req.body.slug) {
    return res.render('article/edit', {error: 'Fill title, slug.'})
  }
  Article.create(req.body)
    .then(article => res.redirect('/'))
    .catch(err => next(err))
})

router.get('/:slug', (req, res, next) => {
  if (!req.params.slug) return next(new Error('No article slug'))
  Article.findOne({slug: req.params.slug})
    .then(article => {
      if (!article.published) return res.sendStatus(401)
      res.render('article/view', article)
    })
})

module.exports = router