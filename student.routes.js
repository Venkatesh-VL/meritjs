var express = require("express");
var router = express.Router();
var s = [];


router.get("/studreg",function(req,res){
    res.sendFile(__dirname+"/stuudreg.html");
})

router.post("/studregister",function(req,res){
    s.push(req.body)
    res.send("Registration success");
})

router.get("/liststud",function(req,res){
    res.render('stud',{
        allstudent: s
    })
})

module.exports = router;