var express = require("express");
var app = express();

var student = require("./student.routes");
var employee = require("./employee.routes");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set('view engine','pug');
app.set('views','./views');

app.get("/",function(req,res){
    res.sendFile(__dirname+"/homepage.html")
});

app.use("/student",student);
app.use("/employee",employee);



app.listen(8060,function(){console.log("listening on 8090")
});
