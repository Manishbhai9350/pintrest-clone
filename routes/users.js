var plm = require('passport-local-mongoose')
var mongoose = require('mongoose')

function connect () {
try {
mongoose.connect('mongodb+srv://Manish_bhai:manish_db_93@test.jgzvxg7.mongodb.net/?retryWrites=true&w=majority')
console.log('DB CONNECTION SUCCESS --!!')
} catch (e) {
console.log('ERROR WHILE CONNECTING DATABASE', +e)
}
}
connect()

var userSchema = mongoose.Schema({
username: {
type: String,
required: true
},
coverImage:{
  type:String
}
,
fullname: {
type: String,
required: true
},
email: {
type: String,
required: true
},
password: {
type: String,
required: true
},
posts: [{
type: mongoose.Schema.Types.ObjectId,
ref: 'post'
}]
})


userSchema.plugin(plm)
module.exports = new mongoose.model('user', userSchema);