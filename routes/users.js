const router = require('express').Router();
const userSvc = require('../services/userSvc')

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

router.post('/add', (req, res) => {
  userSvc.create(req.body)
    .then(id => {
      res.redirect(id)
    })
})

router.get('/:id', (req, res) => {
  userSvc.detail(req.params.id)
    .then(user => {
      res.render('view', {user: user})
    })
})

router.get('/:id/del', (req, res) => {
  userSvc.remove(req.params.id)
    then(_ => {
      res.redirect('/users')
    })
})

router.get('/:id/edit', (req, res) => {
  userSvc.detail(req.params.id)
    .then(user => {
      res.render('edit', {user: user})
    })
})

router.post('/:id/edit', (req, res) => {
  userSvc.modify(req.params.id, req.body)
    .then(_ => {
      res.redirect('/users/' + req.params.id)
    })
})

module.exports = router;
