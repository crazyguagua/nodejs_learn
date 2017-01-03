var express = require('express');
var router = express.Router();
//登陆中间件
var checkNotLogin = require('../middleware/check').checkNotLogin;
//登陆页
router.get('/',checkNotLogin,function(req,res,next){
	res.send(req.flash());
});
//用户登陆
router.post('/',checkNotLogin,function(req,res,next){
	res.send(req.flash());
})
module.exports=router;