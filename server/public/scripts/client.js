console.log('client.js is sourced!');


function fetchAndRenderCalculations (){
    axios({
        method: 'GET',
        url: '/calculations'
      }).then((response) => {
        let calculationsFromServer = response.data;
        console.log(calculationsFromServer);
    })}      
      
    fetchAndRenderCalculations(); 