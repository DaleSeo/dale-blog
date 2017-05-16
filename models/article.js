const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate: [
      {
        validator (value) {
          return value.length <= 120
        },
        message: 'Title is too long (120 max)'
      }
    ]
  },
  text: String,
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String,
    set (value) {
      return value.toLowerCase().replace(' ', '-')
    }
  }
})

schema.static('list', function (callback) {
  return this.find({}, null, {sort: {_id: -1}}, callback)
})

module.exports = mongoose.model('Article', schema)
