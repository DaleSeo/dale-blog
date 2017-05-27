const router = require('express').Router()
const passport = require('passport')
const User = require('../models/user')


router.get('/login', (req, res) => {
  res.render('login', { error: req.flash('error') })
})

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    successFlash: 'Successfully loged in.',
    failureRedirect: '/login',
    failureFlash: true
  })
)

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

router.get('/signup', (req, res, next) => {
  if (req.isAuthenticated()) {
    next(new Error('Please log out before singing up.'))
  }
  res.render('signup', { error: req.flash('error') })
})

router.post('/signup', (req, res, next) => {
  if (req.body.password !== req.body.confirmPassword) {
    req.flash('error', 'Please confirm the password.')
    res.redirect('/signup')
  }

  User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => res.redirect('/login'))
  .catch(err => {
    if (err.code === 11000) {
      req.flash('error', 'Duplicated email!')
      res.redirect('/signup')
    } else {
      next(err)
    }
  })
})

router.get('/profile', (req, res, next) => {
  res.render('profile', {user: req.user})
})

router.post('/profile/updatePassword', (req, res, next) => {
  if (req.body.newPassword !== req.body.confirmPassword) {
    res.status(400).send('Passwords don\'t match')
    return
  }
  User.findById(req.user._id)
    .then(user => {
      if (user.password !== req.body.oldPassword) {
        res.status(400).send('Old password doesn\'t match')
        return
      }
      user.password = req.body.newPassword
      user.save()
        .then(_ => res.sendStatus(204))
    })
    .catch(next)
})

router.post('/profile/removeAccount', (req, res, next) => {
  User.findByIdAndRemove(req.user._id).exec()
    .then(user => {
      console.log('User removed:', user)
      req.logout()
      res.sendStatus(204)
    })
    .catch(next)
})

module.exports = router
