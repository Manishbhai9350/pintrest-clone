var mongoose = require('mongoose')

var postSchema = mongoose.Schema({
postText: {
type: String,
default: ''
  },
  post: {
  type: String,
  },
  owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'user'
  }
  }, {
  timestamps: true
  })

  module.exports = mongoose.model('post', postSchema)