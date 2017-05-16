const router = require('express').Router()
const fs = require('fs')
const path = require('path')

const userSvc = require('../services/userSvc')
const config = require('../config')

const aws = require('aws-sdk')
const s3 = new aws.S3({region: config.AWS_DEFAULT_REGION})

const multer = require('multer')
const multerS3 = require('multer-s3')

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: config.S3_BUCKET_NAME,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata (req, file, cb) {
      cb(null, file)
    }
  })
})

router.get('/', (req, res) => {
  userSvc.list()
    .then(users => {
      console.log(users)
      return users
    })
    .then(users => {
      res.render('user/index.ejs', {users: users})
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
  res.render('user/edit', {user: newUser})
})

router.post('/add', upload.single('photo'), (req, res) => {
  console.log('#req.body:', req.body)
  console.log('#req.file:', req.file)
  if (req.file) {
    req.body.photo = {
      type: req.file.mimetype,
      name: req.file.originalname,
      size: req.file.size,
      location: req.file.location
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
      // delete user.photo
      res.render('user/view.ejs', {user: user})
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
      res.render('user/edit.ejs', {user: user})
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
      location: req.file.location
    }
  }
  userSvc.modify(req.params.id, req.body)
    .then(_ => {
      res.redirect('/users/' + req.params.id)
    })
})

module.exports = router;
