const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = require('./db.js');
const User = mongoose.model('User');

let newUser = {
    'firstName': 'test_f', 
    'lastName': "test_l", 
    'email': 'SMOGES1@b.com', 
    'university': "uni:=", 
    'password': "password",
    'userID':"userID",
    'mealPlanInfo': {'mealPlanFall':{'planName': "300-flex", 'mealPerSemester': 300, 'diningDollars': 300, 'numberOfMealsDistributed': 0}, 
                    'mealPlanSpring': {'planName': "200-flex", 'mealPerSemester': 200, 'diningDollars': 100, 'numberOfMealsDistributed': 0}},
    'ExchangeData':{'direct': [{'studentID': "sm6157", 'amount': 5}, {'studentID': "sm6950", 'amount': 15}], 'donation': 10}}
                



    // {'mealPlanSpring': {'planName': "300-flex", 'mealPerSemester': '300', 'diningDollars': '300', 'numberOfMealsDistributed': '0'}}

const user = new User(newUser);
//  user.save((err, student) => {
    
//     console.log(student)

// });





let giver = function takeAway(giverEmail, amount) {
    User.find({}, function(err, val) {
     
       let t = val.map(t => t.email === giverEmail)
       for(let i = 0; i < t.length; i++){
           if(t[i]){
               giverCurrentMealSize = val[i].mealPlanInfo.mealPlanFall.mealPerSemester;
               let new_giverMealSize = giverCurrentMealSize - amount;
            console.log(new_giverMealSize)
            let myquery = { email: giverEmail }
            let newvalues = { $set: { "mealPlanInfo.mealPlanFall.mealPerSemester": new_giverMealSize }}
            User.updateOne(myquery, newvalues, function(err, res) {
                console.log('done')
                console.log(err)
            })
           }
       }
       return undefined;
  
   })
 }

 let reciever = function giveTo(email, amount) {
    User.find({}, function(err, val) {
     
       let t = val.map(t => t.email === email)
       for(let i = 0; i < t.length; i++){
           if(t[i]){
               let currentMealSize = val[i].mealPlanInfo.mealPlanFall.mealPerSemester;
               let new_MealSize = currentMealSize + amount;
            let myquery = { email: email }
            let newvalues = { $set: { "mealPlanInfo.mealPlanFall.mealPerSemester": new_MealSize }}
            User.updateOne(myquery, newvalues, function(err, res) {
                console.log('done')
                console.log(err)
            })
           }
       }
       return undefined;
  
   })
 }


let donate = function donater(giverEmail, recieverEmail, amount) {

    giver(giverEmail,amount)
    reciever(recieverEmail,amount)
}

let info = function giveTo(email) {
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
console.log(info("SMOGES11@b.com"))
 //console.log(donate('SMOGES11@b.com','SMOGES1@b.com',2))


