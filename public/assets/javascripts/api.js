const moment = require('moment');

function orderFunction() {

    document.getElementById("orderPlaced").innerHTML = "Your order was placed at " + moment().format('LLLL');
    const heading = document.createElement("h1");
    const heading_text = document.createTextNode("Your items: ");
    heading.appendChild(heading_text);
    document.body.appendChild(heading);
}