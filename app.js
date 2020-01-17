
var bodyparser = require('body-parser');    // 解析 HTTP 請求主體的中介軟體
var express = require('express');
 
var conf = require('./conf');
var functions = require('./functions');
var accounts = require('./routes/accounts');
 
var app = express();
app.use('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Accept, Origin, Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
  next();
 });
app.set('views', __dirname + '/views');

app.set('view engine', 'ejs'); 
// 使用 bodyparser.json() 將 HTTP 請求方法 POST、DELETE、PUT 和 PATCH，放在 HTTP 主體 (body) 發送的參數存放在 req.body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
 
app.use(functions.passwdCrypto);
app.use('/accounts', accounts); //       /accounts,使用 routes中的 account

var port = process.env.PORT || 3000;

// create
app.listen(port);

// only print hint link for local enviroment 
if(port === 3000){
  console.log('RUN http://localhost:3000/')
}