console.log('client.js is sourced!');

let operator= '';   

function fetchAndRenderCalculations (){
    axios({
        method: 'GET',
        url: '/calculations'
      }).then((response) => {
        let calculationsFromServer = response.data; //sets a variable name to access the data from the server. The data is in the form of an object via Axios 
  
        let resultToDOM = document.getElementById("recentResultInput"); // get location to put the result
      
        resultToDOM.innerHTML =''; // clear location for result

        let currentResult = calculationsFromServer[calculationsFromServer.length -1]; // access the most recent object of the array

        let ResultOne = currentResult.result;  // access the result property of that object 

        // render the most recent result to the DOM 
        resultToDOM.innerHTML += ` 
            <h2>${ResultOne}</h2>
        `

       let historyToDOM = document.getElementById("resultHistoryInput"); // get the location to the put the calculation history 

        historyToDOM.innerHTML=''; // clear location for the current history 

        for (let eachObject of calculationsFromServer){ // loop through the array of objects, pull out their inputs and render them to the DOM in a list item 
            historyToDOM.innerHTML +=`
            <li>${eachObject.numOne} ${eachObject.operator} ${eachObject.numTwo} = ${eachObject.result}</li>
            `
        }
    })}      
      
    fetchAndRenderCalculations(); 


function addInputs (event){
    event.preventDefault()
    operator = '+'}

function subtractInputs (event){
    event.preventDefault()
    operator = '-'}

function multiplyInputs (event){
    event.preventDefault()
    operator = '*'}

function divideInputs (event){
    event.preventDefault()
    operator = '/'}

function clearInputs(event){
    document.getElementById("numOneInput").textContent = ''; 
    document.getElementById("numTwoInput").textContent = ''; 
    }


function addCalculations(event){
    event.preventDefault(); 

    let numOne = document.getElementById("numOneInput").value; 
    let numTwo = document.getElementById("numTwoInput").value;
       
    axios({
        method: 'POST',
        url: '/calculations',
        data: {
            numOne: numOne, numTwo: numTwo, operator: operator
        }
      }).then((response) => {
        // The POST was successful, so we clear out the
        // form inputs and call fetchAndRenderColors to
        // bring the DOM back in sync with our data:
        document.getElementById("numOneInput").value = ''; 
        document.getElementById("numTwoInput").value = '';
        fetchAndRenderCalculations(); 
      })
    }

