const mongoose = require('mongoose');

/**
 * The database will be storing the user's personal 
 * information as well as their meal plan information.
 * This information will be linked using the student's ID
 * 
 */

//this will store users personal information 
let Schema = mongoose.Schema;
let userPersonalInfo = new mongoose.Schema({
    firstName: {
        type: String, 
        required: true
    },
    lastName: {
        type: String, 
        required: true
    },
    email:{
        type: String, 
        required: true
    },
    userID:{
        type: String, 
        required: true
    },
    password:{
        type: String, 
        required: true
    },
    university: {
        type: String, 
        required: true
    },
    // mealPlanInfo:[userMealPlanData],
    // exchangeInfo: [ExchangeData]

});

//this will store specific meal plan that each user has 

let userMealPlanData = new mongoose.Schema({ 
    mealPlanFall: 
        { planName: {
            type: String, 
        }, 
          mealPerSemester: {
            type: Number, 
        }, 
          diningDollars: {
            type: Number, 
        },
          numberOfMealsDistributed:0
        },
    mealPlanSpring: 
        { planName: {
            type: String, 
        }, 
          mealPerSemester: {
            type: Number, 
        }, 
          diningDollars: {
            type: Number, 
        },
          numberOfMealsDistributed: 0
        }
      
})

//how many meals a user sent to another user or to the donation pool 

let ExchangeData = new mongoose.Schema({
   direct: {
       studentID: {
        type: String, 
    },
       amount: 0
   },
   donation: {
       amount:0
   }
})

const User = module.exports = mongoose.model('userPersonalInfo', userPersonalInfo)
mongoose.connect('mongodb://localhost/UserData',{ useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = {
//     userMealPlanData: userMealPlanData,
//     userPersonalInfo: userPersonalInfo
// }