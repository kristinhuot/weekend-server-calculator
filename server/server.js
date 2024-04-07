const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json()); //teach my server to read incoming JSON data from my POST request
app.use(express.static('server/public')); // serve up static files (HTML, CSS, Client JS)

// Global variable that will contain all of the calculation objects:
let calculations = []; 

// GET /calculations

app.get('/calculations', (req, res)=> {
  console.log('get /calculations received a request'); // gets the calculations array and sends back 
  res.send(calculations);
})

// POST /calculations

app.post('/calculations', (req, res) => { // receive data from client side POST request 
  console.log('POST /calculations received a request!');
  
 let numOne = Number(req.body.numOne) // defines a variable for the received data. Forces data into being a number
 // and accesses the numOne property data 

 let numTwo = Number(req.body.numTwo) // defines a variable for the received data. Forces data into being a number
 // and accesses the numTwo property data 

 let operator = req.body.operator // degines a variable for the received data. Accesses the operator data
 let result = 0; // defines a variable for the result, to be later stuffed into the object 

 if (operator === '+') { // if statement to 'do the math' of the calculations using the operator variable
  result = numOne + numTwo
 }
  else if (operator === '-'){
  result = numOne - numTwo}
  
  else if (operator === '*'){
  result = numOne * numTwo
  }
  else if (operator === '/') {
  result = numOne / numTwo
  }

  req.body.result = result; // stuffs the result variable into the object and gives it the value from 
  // the above calculating 

  calculations.push(req.body); // pushes the object that includes the result property into the 
  // calculations array 
  
  res.sendStatus(201); // sends status back! 
})



// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === 'test') {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log('server running on: ', PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
}

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
}

module.exports = app;
