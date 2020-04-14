if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
  const mongoose = require('mongoose');
  mongoose.Promise = global.Promise;

  const db = require('./db.js');
  const express = require('express')
  const app = express()
  const bcrypt = require('bcrypt')
  const passport = require('passport')
  const flash = require('express-flash')
  const session = require('express-session')
  const methodOverride = require('method-override')
  const User = mongoose.model('User');
  const initializePassport = require('./passport-config')
  let userMealSize = 0;
  let userDiningDollars = 0;
  let userEmail = ""
  let userCampusCash = 0
  initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
  )
  
  const users = []
  app.use(express.static(__dirname + '/public'));

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
    res.render('index.ejs', { userMealSize, userDiningDollars, userCampusCash})
  })

  app.post('/', (req, res) => {
    info(req.body.email,req.body.amount)
    
    let amount = req.body.amount
    let total = userMealSize
    let finalAmount = parseInt(total) - parseInt(amount)

    let myquery1 = { email: userEmail }
    let newvalues1 = { $set: { "mealPlanInfo.mealPlanFall.mealPerSemester": finalAmount }}
    User.updateOne(myquery1, newvalues1, function(err, res) {
      
  })
    res.redirect('/')
  })
  
 

  app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
  })
  
  app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
    
  }))

  
  
  app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
  })
  
  app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      let fname = req.body.fname
      let lname = req.body.lname
      let university = req.body.university
      let email = req.body.email 
      let userID = req.body.userID
      let fallMealPlanName = req.body.fallMealName
      let springMealPlanName = req.body.springMealName
      let campusCash = req.body.campusCash
      let mealSize = 0;
      let dd = 0;
      if(springMealPlanName === "300-flex-plus" || fallMealPlanName === "300-flex-plus" ) {
        mealSize = 300;
        dd = 250
      }else if(springMealPlanName === "300-flex" || fallMealPlanName === "300-flex" ) {
        mealSize = 300;
        dd = 150
      } else if(springMealPlanName === "225-flex-plus" || fallMealPlanName === "225-flex-plus" ) {
        mealSize = 225;
        dd = 300
      } else if(springMealPlanName === "225-flex" || fallMealPlanName === "225-flex" ) {
        mealSize = 225;
        dd = 200
      } 
      let password = hashedPassword
      let newUser = {
                  'firstName': fname, 
                  'lastName': lname, 
                  'email': email, 
                  'university': university, 
                  'password': password,
                  'userID':userID,
                  'mealPlanInfo': {'mealPlanFall':{'planName': fallMealPlanName, 'mealPerSemester': mealSize, 'diningDollars': dd,'campusCash': campusCash, 'numberOfMealsDistributed': 0}, 
                  'mealPlanSpring': {'planName': springMealPlanName, 'mealPerSemester': mealSize, 'diningDollars': dd,'campusCash': campusCash, 'numberOfMealsDistributed': 0}},
                  'ExchangeData':{'direct': [{'studentID': "", 'amount': 0}], 'donation': 0}
              }
      userMealSize = mealSize;
      userDiningDollars = dd;
      userEmail = email;
      userCampusCash = campusCash
      users.push({
        id: Date.now().toString(),
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        password: hashedPassword
      })

      const user = new User(newUser);
    user.save((err, student) => {
       
      res.redirect('/login')
    });
      //res.redirect('/login')
    } catch {
      res.redirect('/register')
    }
  })
  
  app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
  })
  
  function checkAuthenticated(req, res, next) {
    //ADD CODE HERE 
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

  let info = function getInfo(email, amountEntered) {
    User.find({}, function(err, val) {
     
       let t = val.map(t => t.email === email)
       for(let i = 0; i < t.length; i++){
           if(t[i]){
               //let q = "mealPlanInfo.mealPlanFall.mealPerSemester"
            let amount = amountEntered
            let total = val[i].mealPlanInfo.mealPlanFall.mealPerSemester
            let finalAmount = parseInt(total) + parseInt(amount)
            
            let myquery = { email: email }
            let newvalues = { $set: { "mealPlanInfo.mealPlanFall.mealPerSemester": finalAmount }}
            User.updateOne(myquery, newvalues, function(err, res) {
                // console.log('done')
                // console.log(err)
            })

            
             
            console.log(val[i].mealPlanInfo.mealPlanFall.mealPerSemester)
               return val[i]
           }
       }
       return undefined;
  
   })
 }
  
  app.listen(3000)