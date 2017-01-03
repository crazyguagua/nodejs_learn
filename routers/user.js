var express = require('express');
var router = express.Router();
router.get('/:name',function(req,res){
	var name = req.params.name;
	// res.send('router user ,hello '+name);
	//第一个参数是页面路径
	res.render('users',{
		name:name
	})
});
module.exports = router;