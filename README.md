##安装依赖
1. express cnpm i express@4.14.0 --save
2. cnpm install -g supervisor   在开发过程中，每次修改代码保存后，我们都需要手动重启程序，才能查看改动的效果。使用 supervisor 可以解决这个繁琐的问题，全局安装 supervisor：运行 supervisor --harmony index 启动程序
3. cnpm i ejs --save 模板引擎有很多，ejs 是其中一种，因为它使用起来十分简单，而且与 express 集成良好，所以我们使用 ejs。安装 ejs：



##知识点
1. 路由获取参数的方法:
	req 包含了请求来的相关信息，res 则用来返回该请求的响应，更多请查阅 express 官方文档。下面介绍几个常用的 req 的属性：
	req.query: 解析后的 url 中的 querystring，如 ?name=haha，req.query 的值为 {name: 'haha'}
	req.params: 解析 url 中的占位符，如 /:name，访问 /haha，req.params 的值为 {name: 'haha'}
	req.body: 解析后请求体，需使用相关的模块，如 body-parser，请求体为 {"name": "haha"}，则 req.body 为 {name: 'haha'}
2.  ejs 有 3 种常用标签：
	<% code %>：运行 JavaScript 代码，不输出
	<%= code %>：显示转义后的 HTML内容
	<%- code %>：显示原始 HTML 内容
3   中间件
	express 中的中间件（middleware）就是用来处理请求的，当一个中间件处理完，可以通过调用 next() 传递给下一个中间件，如果没有调用 next()，则请求不会往下传递，如内置的 res.render 其实就是渲染完 html 直接返回给客户端，没有调用 next()，从而没有传递给下一个中间件。看个小例子，修改 index.js 如下：
	{ {{ 
		var express = require('express');
		var app = express();

		app.use(function(req, res, next) {
		  console.log('1');
		  next(new Error('haha'));
		});

		app.use(function(req, res, next) {
		  console.log('2');
		  res.status(200).end();
		});

		app.listen(3000);
	}} }