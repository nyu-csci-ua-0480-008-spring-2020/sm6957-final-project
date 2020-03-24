const mongoose = require('mongoose');
//this will store users personal information 
let Schema = mongoose.Schema;
let userPersonalInfo = new mongoose.Schema({
    firstName: 'first name',
    lastName: 'last name',
    userID: 'student id',
    university: 'unversity name'
})

//this will store specific meal plan that each user has 
let userMealPlanData = new mongoose.Schema({ 
    userID: 'student id',
    mealPlan: [
        { planName: "300 Flex Plus", 
          mealPerSemester: 300, 
          diningDollars: 250
        }
      ]
})

