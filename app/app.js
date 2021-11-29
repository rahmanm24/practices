const express = require('express');

const app = express();

// Get the functions in the db.js file to use
const db = require('./services/db');

app.get("/", function(req,res){
    res.send("Hello Nabil");
});

app.get("/stand", function(req,res){

    var sql = 'SELECT BikeStand.standName, BikeStand.standID, COUNT(Bike.slID) AS count FROM BikeStand INNER JOIN Bike ON BikeStand.standID = Bike.bikeStandID WHERE Bike.bikeStatus = "Available" GROUP BY BikeStand.standID';
    /*db.query(sql).then(results => {
        console.log(results);
        res.json(results);
    });*/

    var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + '<a href="./single-stand/' + row.standID + '">' + row.standName + '</a> - ' + row.count + ' Bikes Available </td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);
    });

    //res.json(results);
})


app.listen(3000, function(){
    console.log("app running on http://127.0.0.1:3000");
})