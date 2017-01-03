module.exports=function(app){
	app.get('/',function(req,res){
		res.redirect('/posts');
	});
	app.use('/login',require('./login'));	
	app.use('/signup',require('./signup'));	
}