const express = require('express');
const app = express();
let PORT = process.env.PORT || 5000;

app.use(express.json()); //teach my server to read incoming JSON data from my POST request
app.use(express.static('server/public')); // serve up static files (HTML, CSS, Client JS)

// Global variable that will contain all of the
// calculation objects:
let calculations = []; 

// Here's a wonderful place to make some routes:

// GET /calculations

app.get('/calculations', (req, res)=> {
  console.log('get /calculations received a request');
  res.send(calculations);
})

// POST /calculations

app.post('/calculations', (req, res) => {
  console.log('POST /calculations received a request!');
  
 let numOne = Number(req.body.numOne)
 let numTwo = Number(req.body.numTwo)
 let operator = req.body.operator
 let result = 0; 

 if (operator === '+') {
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

 console.log('this is the result:', result);

  req.body.result = result;

  calculations.push(req.body);
  
  res.sendStatus(201);
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
