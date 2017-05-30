const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

exports.encryptPassword = function (password) {
  return bcrypt
    .genSalt(SALT_ROUNDS)
    .then(salt => bcrypt.hash(password, salt))
}

exports.comparePasswords = function (plainPassword, cipherPassword) {
  return bcrypt.compare(plainPassword, cipherPassword)
}
