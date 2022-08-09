const User = require('../models/User')
const passport = require('passport')

function newUser(req, res) {
  res.render('user/add_new')
}

function login(req, res, err) {
  if (err) {
    console.log(err)
  }
  res.render('user/login', { message: req.flash('message') })
}

function logout(req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    }
    res.redirect('/login')
  })
}

function redirect(req, res) {
  res.redirect('/login')
}

function userAdd(req, res) {
  console.log('tutaj dodaję użytkownika')
  const userId = req.params.id
  const newUser = new User({ users: userId, ...req.body })

  newUser.save(function (err) {
    if (err) {
      res.status(404)
      res.render('user/add_new', { message: ' **!! NIE UDAŁO SIĘ DODAĆ UŻYTKOWNIKA !!**' })
    }
    else {
      req.flash('message', ' ** NOWY UŻYTKOWNIK ZOSTAŁ DODANY! **')
      res.redirect('/login')
    }
  })
}

function loginProcess(req, res, next) {
  passport.authenticate('local-login', function (err, user) {
    console.log(user.email)

    if (err) {
      return next(err)
    }
    if (!user) {
      console.log('NOT user')
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err)
      }
      console.log('passportCallBack')
      // req.session.msgCssClass = 'alert-success'
      return res.redirect('/customer/list')
    })
  })
    (req, res, next)
}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function isLoggedOut(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  }
  res.redirect('/')
}

module.exports = {
  newUser,
  login,
  logout,
  redirect,
  add: userAdd,
  isLoggedIn,
  isLoggedOut,
  loginProcess
}
