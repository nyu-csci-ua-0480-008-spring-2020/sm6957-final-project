const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = require('./db.js');
const User = mongoose.model('User');

let newUser = {
    'firstName': 'test_f', 
    'lastName': "test_l", 
    'email': 'SMOGES@b.com', 
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
let myquery = { email: 'SMOGES@b.com' }
let newvalues = { $set: { password: "TESTTT1234!" }}
User.updateOne(myquery, newvalues, function(err, res) {
    console.log('done')
    console.log(err)
})

// if(User.find({email: 'SMOGES@b.com' })){
//     console.log('here')
//     User.updateOne({ email: 'SMOGES@b.com' }, { $set: { password: "TESTTT1234!" } })
// }
//user.update({ lastName: 'TESTTTTTTTTT123' }, { $set: { "userID": "TESTTT1234!" } })

    
    //  user.save((err, student) => {
    //     console.log('AFTER')

    //     console.log(student)
      
    // });