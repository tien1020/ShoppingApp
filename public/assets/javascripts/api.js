const axios = require('axios');


exports.getActivity = function(){
    axios.get('https://www.boredapi.com/api/activity/').then(response => {
        console.log("Activity: "+response.data.activity);
        const span = document.createElement("SPAN");
        const text = document.createTextNode("Your activity: " + response.data.activity);
        span.appendChild(text);
        document.getElementById('activity').appendChild(span);

    }).catch(err =>{
        console.error('Error: ', err);
        document.getElementById("orderPlaced").innerText = 'Can not find activity';
    })


}