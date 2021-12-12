var express = require('express');
var router = express.Router();
var db = require('../db');

//conectar con la db
db.connect('mongodb://localhost:27017',function(err){
  if(err){
    throw("Fallo en la conexion");
  }
});

/* GET users listing. */
router.get('/', function(req, res, next) {
  db.get().db("db").collection('users').find().toArray(function(err,result){
    if(err){
      throw('Fallo en la conexion con la coleccion users');
    }else{
      res.send(result);
    }
  });
});

router.post('/create',function(req,res,next){
  const user = {};
  user.nombre = req.body.nombre;
  db.get().db("db").collection("users").insertOne(user,function(err,result){
    if(err){
      throw("Fallo en la conexion con la coleccion de users");
    }
    else{
      res.send(result);
    }
  });
});

// add a document to the DB collection recording the click event
router.post('/create', (req, res) => {
    const click = {clickTime: new Date()};
    console.log(click);
    console.log(db);

    router.collection('users').save(click, (err, result) => {
        if(err){
            return console.log(err);
        }
        console.log('user added to db');
        res.sendStatus(201);
    });
});

// get the click data from the database
router.get('/users', (req, res) => {
    router.collection('users').find().toArray((err, result) => {
      if (err) return console.log(err);
      res.send(result);
    });
  });

module.exports = router;