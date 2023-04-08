const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const app = express()
const port = 3001
app.use(bodyParser.urlencoded({ extended: true}))

const users = fs.readFile(__dirname + '/users.json', function (err, data) {
  console.log("Testing whether it works initiallly");
  if (err) console.log("json file may not created")
  else {
    const users = JSON.parse(data);
    console.log(err);
    return users;
  }
  console.log("Testing whether it works");
  // USERS = users;
  // console.log("User object: " + users);
});

const USERS = users || [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];



const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const userDataFromFrontend = {
    email: req.body.email,
    password: req.body.password
  }

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)
  if (USERS.some(function (user) { return user.email === userDataFromFrontend.email })) {
    return res.status(400).send('Email is already taken')
  } else {
    USERS.push(userDataFromFrontend)
  }

  console.log(userDataFromFrontend)
  // return back 200 status code to the client
  res.sendStatus(200)
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const userDetailsFromFrontend = {
    email: req.body.email,
    password: req.body.password
  }

  // Check if the user with the given email exists in the USERS array
  // Also ensure that the password is the same

  const isCredientialsMatched = USERS.some(function(user) { 
    return (user.email === userDetailsFromFrontend.email && user.password === userDetailsFromFrontend.password) 
  })

  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client
  if(isCredientialsMatched){
    res.status(200).send("Hello World from route 2!")
  } else{
    return res.sendStatus(401)
  }
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})