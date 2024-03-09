var express = require('express');
var router = express.Router();
var userModel = require('./users')
var postModel = require('./posts')
var passport = require('passport')
var stratergy = require('passport-local')
var upload = require('./multer')

passport.use(new stratergy(userModel.authenticate()))

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index');
});
router.get('/login', function(req, res, next) {
let err = req.flash('error')
res.render('login', {
error: err
});

router.post('/upload', isLoggedIn, upload.single('file'), async (req, res) => {
if (!req.file) { return res.status(400).send('NO FILE UPLOADED ') }
try {
console.log('FINDING USER')
var user = await userModel.findOne({username: req.session.passport.user})
var post = await postModel.create({
postText: req.body.postText,
post: req.file.filename,
owner: user._id
})

user.posts.push(post._id)
await user.save()
res.redirect('/profile')
} catch (e) {
console.log('ERROR WHILE UPLOADING DATA')
}
})

});
router.get('/feed', isLoggedIn, function(req, res, next) {
res.send('feed page');
});

router.get('/profile', isLoggedIn, async (req, res) => {
try {
var user = await userModel.findOne({
username: req.session.passport.user,
}).populate('posts')

res.render('profile', {
user: user,
})
}
catch (e) {
console.log('ERROR WHILE SHOWING PROFILE DATA')
}
})

router.post('/register', async function(req,res) {
var {username, email, password, fullname} = req.body
var data = await  new userModel({
username, email, fullname, password
})

userModel.register(data, password).then( function() {
passport.authenticate('local')(req, res, () => {
res.redirect('/profile')
})
}) })

router.post('/login', passport.authenticate('local', {
successRedirect: '/profile',
failureRedirect: '/login',
failureFlash: true
}), function () {
  
})

router.get('/logout', (req, res, next) => {
req.logout((err) => {
if (err) return next(err);
res.redirect('/login')
})
})

function isLoggedIn (req, res, next) {
if (req.isAuthenticated()) {
return next()
} else {
res.redirect('/login')
}
}

module.exports = router;