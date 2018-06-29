const router = require('express').Router()
const User = require('../db/models/user')
const urlExists = require('url-exists')


module.exports = router

router.post('/login', async (req, res, next) => {
  const user = await User.findOne({ where: { email: req.body.email } }) ||
    await User.findOne({ where: { username: req.body.username } })
  if (!user)
    res.status(401).send('No such username/email found')
  else if (!user.correctPassword(req.body.password))
    res.status(401).send('Wrong password')
  else
    req.login(user, err => (err ? next(err) : res.json(user)))
})


router.post('/signup', (req, res, next) => {
  const email = req.body.email
  const url = 'https://' + email.slice(email.indexOf('@') + 1)
  console.log(url)
  urlExists(url, function (err, exists) {
    console.log(exists)
    if (exists) {
      User.create(req.body).then(user => {
        req.login(user, err => {
          err ? next(err) : res.json(user)
        })
      })
        .catch(err => {
          if (err.name === 'SequelizeUniqueConstraintError')
            res.status(401).send('Username/email already exists')
        })
    }
    else res.status(401).send('invalid email')
  })
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.redirect('/')
})

router.get('/me', (req, res) => {
  res.json(req.user)
})
