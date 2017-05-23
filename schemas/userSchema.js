const Schema = require('mongoose').Schema

const schema = new Schema({
  email: {
    type: String,
    required: true,
    set (value) {
      return value.trim().toLowerCase()
    },
    validate: [
      {
        validator (email) {
          return (email.match(/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i) != null)
        },
        message: 'Invalid email'
      }
    ]
  },
  password: String,
  admin: {
    type: Boolean,
    default: false
  }
}, { timestamps: true })

module.exports = schema
