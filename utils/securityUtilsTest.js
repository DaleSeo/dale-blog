const securityUtils = require('./securityUtils')
const assert = require('assert')

securityUtils.encryptPassword('1234')
  .then(cipher => {
    console.log(cipher)
    return cipher
  })
  .then(cipher => securityUtils.comparePasswords('1234', cipher))
  .then(isMatch => assert.ok(isMatch))

securityUtils.encryptPassword('1234')
  .then(cipher => {
    console.log(cipher)
    return cipher
  })
  .then(cipher => securityUtils.comparePasswords('5678', cipher))
  .then(isMatch => assert.ok(!isMatch))
