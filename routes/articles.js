const router = require('express').Router()
const authUtils = require('../utils/authUtils')
const Article = require('../models/article')

router.get('/new', (req, res, next) => {
  res.render('article/edit', {article: {}})
})

router.post('/new', (req, res, next) => {
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
      // if (req.session.user.role != 'Admin' && !article.published) return res.sendStatus(401)
      res.render('article/view', article)
    })
    .catch(err => next(err))
})

router.get('/:id/edit', (req, res, next) => {
  Article.findOne({_id: req.params.id})
    .then(article => {
      res.render('article/edit', {article: article})
    })
    .catch(err => next(err))
})

router.post('/:id/edit', (req, res, next) => {
  Article.updateOne({_id: req.params.id}, {$set: req.body})
    .then(result => {
      console.log('#result:', result)
      res.redirect('/articles/' + req.body.slug)
    })
    .catch(err => next(err))
})

router.delete('/:id', (req, res, next) => {
  if (!req.params.id) return next(new Error('No article ID.'))
  Article.findByIdAndRemove(req.params.id)
    .then(article => res.send(article))
    .catch(err => next(err))
})

router.put('/:id', (req, res, next) => {
  if (!req.params.id) return next(new Error('No article ID.'))
  Article.findByIdAndUpdate(req.params.id, {$set: req.body.article})
    .then(count => res.send({affectedCount: count}))
    .catch(err => next(err))
})

module.exports = router
