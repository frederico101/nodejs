/*
 * Express framework
 * author: frederico
 *
 */

const express = require("express");

const app = express();

var port = 8080;

app.get("/", function(req, res){

 res.sendFile(__dirname  + '/index.html');

}); 

app.get("/sobre", function(req, res){

 res.send("About page");

}); 

app.get('/ola/:nome', function(req, res){

res.send("<h1>Olá </h1>" +req.params.nome);


});



app.listen(port, function(){

  
   console.log("Servidor rodando na porta =>  " +port);

});