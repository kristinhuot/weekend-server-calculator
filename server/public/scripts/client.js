console.log('client.js is sourced!');

let operator= '';   

function fetchAndRenderCalculations (){
    axios({
        method: 'GET',
        url: '/calculations'
      }).then((response) => {
        let calculationsFromServer = response.data;
        console.log(calculationsFromServer);

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