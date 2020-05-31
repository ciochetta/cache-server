const express = require('express');
const body_parser = require('body-parser');
const app = express();

let cache = {};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization");

  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

app.use(body_parser.urlencoded({ extended: false }));

app.use(body_parser.json());

app.get ('/:key', (req,res) => {
  let key = req.params.key;

  let response = getCache(key);

  if(response !== undefined){
    res.status(200).json({
      message: "ok",
      res:response
    });
  }

  else {
    res.status(400).json({
      message: "Invalid key"
    })
  }
});

app.post ('/:key', (req,res) => {
  let key = req.params.key;

  let value = req.body.value;

  let response = setCache(key, value);

  if(response !== undefined){
    res.status(200).json({
      message: "ok",
      res:response
    });
  }

  else {
    res.status(400).json({
      message: "Invalid key"
    })
  }
});

app.get ('/', (req,res) => {
  res.status(200).json({"message":"cache server is online"});
});

function getCache(key) {
  return cache[key];
}

function setCache(key, value) {
  console.log(`key ${key} changed`);
  cache[key] = value;

  return getCache(key);
}


app.listen(3001, () => {
  console.clear();
  console.log("Cache running, listening in http://localhost:3001/");
});
