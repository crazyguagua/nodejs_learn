var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var pkg= require('./package');
var routers = require('./routers');

//middleware
// app.use(function(req,res,next){
// 	console.log(1);
// 	next(new Error('haha'));
// });
// app.use(function(req,res,next){
// 	console.log(2);
// 	res.status(200).end();
// });
// //错误处理
// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });
//设置默认引擎
app.set('view engine','ejs');//设置模板引擎为 ejs
app.set('views',path.join(__dirname,'views'));//设置存放模板文件的目录
// 设置静态文件目录
app.use(express.static(path.join(__dirname,'assets')));


// session 中间件
app.use(session({
  name: config.session.key,// 设置 cookie 中保存 session id 的字段名称
  secret: config.session.secret,// 通过设置 secret 来计算 hash 值并放在 cookie 中，使产生的 signedCookie 防篡改
  cookie: {
    maxAge: config.session.maxAge// 过期时间，过期后 cookie 中的 session id 自动删除
  },
  store: new mongoStore({// 将 session 存储到 mongodb
    url: config.mongodb// mongodb 地址
  })
}));
// flash 中间价，用来显示通知
app.use(flash());
// 处理表单及文件上传的中间件
app.use(require('express-formidable')({
  uploadDir: path.join(__dirname,'upload'),// 上传文件目录
  keepExtensions: true// 保留后缀
}));
// 路由
// 设置模板全局常量
app.locals.blog = {
  title: pkg.name,
  description: pkg.description
};

// 添加模板必需的三个变量
app.use(function (req, res, next) {
  res.locals.user = req.session.user;
  res.locals.success = req.flash('success').toString();
  res.locals.error = req.flash('error').toString();
  next();
});
routers(app);
app.listen(3000);