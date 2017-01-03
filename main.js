var express = require('express');
var path = require('path');
var app = express();

var indexRouter = require('./router/index');
app.use('/',indexRouter);
var userRouter = require('./router/user');
app.use('/user',userRouter);

//设置默认引擎
app.set('view engine','ejs');//设置模板引擎为 ejs
app.set('views',path.join(__dirname,'views'));//设置存放模板文件的目录
app.listen(3000);