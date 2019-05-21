const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
const admin = require("./routes/admin");
var path = require("path");
const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost/blogapp").then(()=>{
   console.log("connected with success")
}).catch((err)=>{

    console.log("Error while connecting " + err);
})

//session
app.use(session({

  secret:"cursidenode",
  resave:"true",
  saveUninitialized: true

}));
//flash sempre abaixo da sessao
app.use(flash())

app.use((req, res, next )=>{
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

app.engine('handlebars', handlebars({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
//public
app.use(express.static(path.join(__dirname,"public")))

//midleware
app.use((req, res, next)=>{

  console.log("midleware")
   next();
});

//routes
/*
app.get('/admin',(req, res)=>{
  res.send('Rota principal');
})*/
app.get('/', admin)  // I named the route / with the name admin

app.get('/post',(req, res)=>{
  res.send('lista de posts');
})

app.use('/admin', admin);



const PORT = 8081;
app.listen(PORT,()=>{
  console.log('Servidor rodando');
});