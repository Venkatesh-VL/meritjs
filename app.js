var express = require("express");
var app = express();
var path = require("path");


const {MongoClient,ObjectId, Db} = require("mongodb")
const url = 'mongodb://127.0.0.1:27017/';

app.use(express.static("uploads"))


app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.set('view engine','pug');
app.set('views','./views');

const multer = require("multer")


const storage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname+'/uploads');
    },
    filename: (req,file,cb) => {
        var fileext = path.extname(file.originalname);
        console.log(file);
        const uniqueSuffix = Date.now() + '-' +Math.round(Math.random() * 1E9)
        cb(null,file.fieldname+'-'+uniqueSuffix+fileext)
    }
})

const upload = multer({storage: storage})

app.get("/",(req,res)=>{
    MongoClient.connect(url,(err,conn)=>{
        var db = conn.db("merit")
        db.collection('contact').find().toArray((err,data)=>{
            res.render("contacts",{
                allcontacts:data
            })
        });       
    });   
})

app.get("/viewdb/:id?",(req,res)=> {
    MongoClient.connect(url,(err,conn)=>{
        var db = conn.db("merit")
        db.collection('contact').find({_id : ObjectId(req.params.id)}).toArray((err,data)=>{
            res.render("view",{
                contact: data
            })
        });       
    });   
});

app.get("/contact",(req,res)=>{
    res.sendFile(__dirname+"/addcontacts.html")
})

app.post("/addcontact",upload.single('propic'),(req,res)=>{
    MongoClient.connect(url,(err,conn)=>{
        var db = conn.db("merit");
        req.body.propic = req.file.filename
        db.collection("contact").insertOne(req.body)
            res.redirect("/");
        })
        })

app.get('/deletecontact/:id?',(req,res) => {
    MongoClient.connect(url,(err,conn) => {
        var db = conn.db('merit');
        db.collection('contact').deleteOne({_id : ObjectId(req.params.id)});
        res.redirect('/');
    });
});

app.get('/updatecontact/:id',(req,res) => {
    console.log(req.params);
    res.render("update",{
        id: req.params.id
    })
})

app.post('/update/:id',upload.single('propic'),(req,res) => {
    MongoClient.connect(url,(err,conn) => {
        var db = conn.db('merit');
        db.collection('contact')
        .updateOne({_id : ObjectId(req.body.id)},
        {$set: {pno:req.body.pno,email: req.body.email,propic:req.file.filename}},
            (err,data) =>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log(data);
                    res.redirect("/");
                }
        });
        });
        });


app.listen(8000,function(){console.log("App listening on 8000")});