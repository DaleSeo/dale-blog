const Schema = require('mongoose').Schema
const securityUtils = require('../utils/securityUtils')

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    set (value) {
      return value.trim().toLowerCase()
    },
    validate: [
      {
        validator (value) {
          return (value.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)
        },
        message: 'Invalid email'
      }
    ]
  },
  password: {
    type: String,
    required: true
  },
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

schema.pre('save', function (next) {
  let user = this
  if (!user.isModified('password')) return next()
  securityUtils.encryptPassword(user.password)
    .then(encryptedPassword => {
      console.log(`password encrypted: ${user.password} => ${encryptedPassword}`)
      user.password = encryptedPassword
      next()
    })
    .catch(err => next(err))
})

schema.methods.verifyPassword = function (candidatePassword) {
  return securityUtils.comparePasswords(candidatePassword, this.password)
}

module.exports = schema
