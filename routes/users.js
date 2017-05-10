const router = require('express').Router()
const fs = require('fs')
const path = require('path')
const userSvc = require('../services/userSvc')

const multer = require('multer')
const upload = multer()

router.get('/', (req, res) => {
  userSvc.list()
    .then(users => {
      console.log(users)
      return users
    })
    .then(users => {
      res.render('index', {users: users})
    })
})

const newUser = {
  'name': '',
  'role': 'Guest',
  'email': '',
  'score': 0,
  'img': 'guest.png'
}

router.get('/add', (req, res) => {
  res.render('edit', {user: newUser})
})

router.post('/add', upload.single('photo'), (req, res) => {
  console.log('#req.body:', req.body)
  console.log('#req.file:', req.file)
  if (req.file) {
    req.body.photo = {
      type: req.file.mimetype,
      name: req.file.originalname,
      size: req.file.size,
      data: req.file.buffer
    }
  }
  userSvc.create(req.body)
    .then(id => {
      res.redirect(id)
    })
})

router.get('/:id', (req, res) => {
  userSvc.detail(req.params.id)
    .then(user => {
      delete user.photo
      res.render('view', {user: user})
    })
})

router.get('/:id/photo', (req, res) => {
  userSvc.detail(req.params.id)
    .then(user => {
      if (user.photo) {
        res.set('Content-Type', user.photo.type)
        res.end(user.photo.data.buffer)
      } else {
        res.set('Content-Type', 'image/png')
        fs.createReadStream(path.join('__dirname', '../public/images/profile.png')).pipe(res)
      }
    })
})

router.get('/:id/del', (req, res) => {
  userSvc.remove(req.params.id)
    .then(_ => {
      res.redirect('/users')
    })
})

router.get('/:id/edit', (req, res) => {
  userSvc.detail(req.params.id)
    .then(user => {
      res.render('edit', {user: user})
    })
})

router.post('/:id/edit', upload.single('photo'), (req, res) => {
  console.log('#req.body:', req.body)
  console.log('#req.file:', req.file)
  if (req.file) {
    req.body.photo = {
      type: req.file.mimetype,
      name: req.file.originalname,
      size: req.file.size,
      data: req.file.buffer
    }
  }
  userSvc.modify(req.params.id, req.body)
    .then(_ => {
      res.redirect('/users/' + req.params.id)
    })
})

module.exports = router;
