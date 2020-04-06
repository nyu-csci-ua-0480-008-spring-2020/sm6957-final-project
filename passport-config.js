const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const db = require('./db.js');
  const mongoose = require('mongoose');
  const User = mongoose.model('userPersonalInfo');
   function getInfo(email) {
     User.find({}, function(err, val) {
        let t = val.map(t => t.email === email)
        for(let i = 0; i < t.length; i++){
            if(t[i]){
                return val[i]
            }
        }
        return undefined;
   
    })
  }
function initialize(passport, getUserByEmail, getUserById) {
    console.log(getUserByEmail)
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    const c = getInfo(email)
    console.log('user'+user)
    console.log('getinfo'+getInfo(email))

    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
          console.log(c)
          console.log(getInfo(email))

        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize