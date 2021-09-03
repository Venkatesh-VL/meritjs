var express = require("express");
var router = express.Router();
var e = [];


router.get("/emplreg",function(req,res){
    res.sendFile(__dirname+"/emplreg.html");
});

router.post("/empregister",function(req,res){
    e.push(req.body)
    res.send("Registration success");
});

router.get("/listemp",function(req,res){
    res.render('emp.pug',{
        allemployee: e
    });
});

module.exports = router;