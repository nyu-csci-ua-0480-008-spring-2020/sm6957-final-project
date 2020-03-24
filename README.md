QuickMeal

# QuickMeal

## Overview

(___TODO__: a brief one or two paragraph, high-level description of your project_)

The inability to pay for meal plans and on-campus dining services or have time to consistently cook can oftentimes pressure students into pursuing unhealthy, less expensive eating options, or worse, not eating at all. Food insecurity has become an increasingly greater issue as the cost of living and tuition steadily increase. 

QuickMeal is a web app that will allow users to send and recieve meal swipes that will go directly to students' accounts or to a general donation pool. Once students create an account with their university credentials and logged in, they can view their current meal plan, and send/request meal swipes to one student or to a general donation pool.


## Data Model

(___TODO__: a description of your application's data and their relationships to each other_) 

The application will store User's personal info (first and last name and, university ID number), meal plan, university name, and number of meals in the current donation pool

(___TODO__: sample documents_)

An Example User:

```javascript
{
  userFirstName: "Selamawit",
  userLastName: "Moges",
  userID: "sm6957",
  hash: // a password hash,
  mealPlanType: // an object holding the type of meal plan
}
```

An Example List with Embedded Items:

```javascript
{
  userID: // a reference to a User object
  name: "Meal Plan Type",
  mealPlan: [
    { planName: "300 Flex Plus", 
    mealPerSemester: 300, 
    diningDollars: 250
    }
  ],
  numberOfMealsDistributed: //number of meals swipes sent to other students       accounts
}
```


## [Link to Commented First Draft Schema](db.js) 


## Wireframes

(___TODO__: wireframes for all of the pages on your site; they can be as simple as photos of drawings or you can use a tool like Balsamiq, Omnigraffle, etc._)

/list/create - page for creating a new shopping list

![list create](documentation/list-create.png)

/list - page for showing all shopping lists

![list](documentation/list.png)

/list/slug - page for showing specific shopping list

![list](documentation/list-slug.png)

## Site map

(___TODO__: draw out a site map that shows how pages are related to each other_)

Here's a [complex example from wikipedia](https://upload.wikimedia.org/wikipedia/commons/2/20/Sitemap_google.jpg), but you can create one without the screenshots, drop shadows, etc. ... just names of pages and where they flow to.

## User Stories or Use Cases

(___TODO__: write out how your application will be used through [user stories](http://en.wikipedia.org/wiki/User_story#Format) and / or [use cases](https://www.mongodb.com/download-center?jmp=docs&_ga=1.47552679.1838903181.1489282706#previous)_)

1. as non-registered user, I can register a new account with the site
2. as a user, I can log in to the site
3. as a user, I can create a new grocery list
4. as a user, I can view all of the grocery lists I've created in a single list
5. as a user, I can add items to an existing grocery list
6. as a user, I can cross off items in an existing grocery list

## Research Topics

(___TODO__: the research topics that you're planning on working on along with their point values... and the total points of research topics listed_)

* (5 points) Integrate user authentication
    * I'm going to be using passport for user authentication
    * And account has been made for testing; I'll email you the password
    * see <code>cs.nyu.edu/~jversoza/ait-final/register</code> for register page
    * see <code>cs.nyu.edu/~jversoza/ait-final/login</code> for login page
* (4 points) Perform client side form validation using a JavaScript library
    * see <code>cs.nyu.edu/~jversoza/ait-final/my-form</code>
    * if you put in a number that's greater than 5, an error message will appear in the dom
* (5 points) vue.js
    * used vue.js as the frontend framework; it's a challenging library to learn, so I've assigned it 5 points

10 points total out of 8 required points (___TODO__: addtional points will __not__ count for extra credit_)


## [Link to Initial Main Project File](app.js) 

(___TODO__: create a skeleton Express application with a package.json, app.js, views folder, etc. ... and link to your initial app.js_)

## Annotations / References Used

(___TODO__: list any tutorials/references/etc. that you've based your code off of_)

1. [passport.js authentication docs](http://passportjs.org/docs) - (add link to source code that was based on this)
2. [tutorial on vue.js](https://vuejs.org/v2/guide/) - (add link to source code that was based on this)

