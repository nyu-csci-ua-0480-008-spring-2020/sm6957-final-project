const mongoose = require('mongoose');

/**
 * The database will be storing the user's personal 
 * information as well as their meal plan information.
 * This information will be linked using the student's ID
 * 
 */

//this will store users personal information 
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
    mealPlanInfo:{   mealPlanFall: 
        { planName: {
            type: String, 
        }, 
          mealPerSemester: {
            type: Number, 
        }, 
          diningDollars: {
            type: Number, 
        },
        campusCash: {
            type: Number, 
        },
          numberOfMealsDistributed:Number
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
        campusCash: {
            type: Number, 
        },
          numberOfMealsDistributed: Number
        }},
    ExchangeData: {direct: [{studentID: {type: String},amount: {type: Number}}],
    donation: {
        type: Number
    }}

});

//this will store specific meal plan that each user has 

// let userMealPlanData = new mongoose.Schema({ 
//     mealPlanFall: 
//         { planName: {
//             type: String, 
//         }, 
//           mealPerSemester: {
//             type: Number, 
//         }, 
//           diningDollars: {
//             type: Number, 
//         },
//           numberOfMealsDistributed:Number
//         },
//     mealPlanSpring: 
//         { planName: {
//             type: String, 
//         }, 
//           mealPerSemester: {
//             type: Number, 
//         }, 
//           diningDollars: {
//             type: Number, 
//         },
//           numberOfMealsDistributed: Number
//         }
      
// })

//how many meals a user sent to another user or to the donation pool 

// let ExchangeData = new mongoose.Schema({
//    direct: [{studentID: {type: String},amount: {type: Number}}],
//    donation: {
//        amount: {type: Number}
//    }
// })

mongoose.model('User', userPersonalInfo)
mongoose.connect('mongodb://localhost/test2',{ useNewUrlParser: true, useUnifiedTopology: true });
// module.exports = {
//     userMealPlanData: userMealPlanData,
//     userPersonalInfo: userPersonalInfo
// }