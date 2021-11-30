const express = require('express');

const app = express();

app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

app.get("/", function(req,res){
    res.render("index");
});

app.get("/stand", function(req,res){

    var sql = 'SELECT BikeStand.standName, BikeStand.standID, COUNT(Bike.slID) AS count FROM BikeStand INNER JOIN Bike ON BikeStand.standID = Bike.bikeStandID WHERE Bike.bikeStatus = "Available" GROUP BY BikeStand.standID';
    

    /*var output = '<table border="1px">';
    db.query(sql).then(results => {
        for (var row of results) {
            output += '<tr>';
            output += '<td>' + '<a href="./single-stand/' + row.standID + '">' + row.standName + '</a> - ' + row.count + ' Bikes Available </td>';
            output += '</tr>'
        }
        output+= '</table>';
        res.send(output);
    });*/

    db.query(sql).then(results => {
        // Send the results rows to the all-students template
        // The rows will be in a variable called data
        res.render('stands', {data: results});
    });

    //res.json(results);
})


app.listen(3000, function(){
    console.log("app running on http://127.0.0.1:3000");
})