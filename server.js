if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const db = require('./db.js');
  const mongoose = require('mongoose');
  const User = mongoose.model('userPersonalInfo');
  mongoose.Promise = global.Promise;
  const path = require('path');

  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  app.use(express.static(path.join(__dirname, 'public')));
let tester = '';
  const initializePassport = require('./passport-config')
  async function getInfo(email) {
    await User.find({}, function(err, val) {
        console.log('here')
        let t = val.map(t => t.email === email)
        for(let i = 0; i < t.length; i++){
            if(t[i]){
                return val[i]
            }
        }
        return undefined;
   
    })
  }
   initializePassport(
    passport,
    email => users.find(user => user.email === email),
   id => users.find(user => user.id === id)
    // email =>  User.find({email: email}),
    // id => User.find({userID: userID})
  )
  const users = []
  app.set('view-engine', 'ejs')
  app.use(express.urlencoded({ extended: false }))
  app.use(flash())
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  }))
  app.use(passport.initialize())
  app.use(passport.session())
  app.use(methodOverride('_method'))
  
  app.get('/', checkAuthenticated, (req, res) => {
    res.render('landing.hbs')
  })
  
  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.hbs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.hbs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      let fname = req.body.fname
      let lname = req.body.lname
      let email = req.body.email
      let uni = req.body.university
      let userID = req.body.userID
      let password = hashedPassword

      let newUser = {
          'firstName': fname, 
          'lastName': lname, 
          'email': email, 
          'university': uni, 
          'userID':userID, 
          'password': password
      }
      users.push({
        id: Date.now().toString(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        university: req.body.university,
        userID: req.body.userID,
        password: hashedPassword
      })
      
    const user = new User(newUser);
    user.save((err, student) => {
        tester = student.email
      //console.log(student.em);
      res.redirect('/login')
    });
      
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.redirect('/login')
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/')
    }
    next()
  }
  
  app.listen(3000)