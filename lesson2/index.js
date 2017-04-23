var express = require("express"); 
var utility = require("utility"); 

var app = express(); 

app.get("/", function(req, res){
    if(req.query.q){
        var q = req.query.q; 
        var md5Value = utility.md5(q); 
    } else{
        md5Value = "no query in the request"; 
    }
    res.send(md5Value); 
}); 

app.listen(3000, function(req, res){
    console.log("app is running in port 3000"); 
})