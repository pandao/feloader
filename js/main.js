define(function(require){
	var feloader = require('feloader'); 

	feloader.queue([
		{url : "js/config.js"},
		{url : "js/underscore.js"}, 
		{
			wait : true,
			url : "js/jquery.min.js", 
			callback : function() { 
				console.log("jquery loaded!");  

				for (var i=0; i<10000; i++) {
					if(i >= 9999) {
						console.log(i);
						return true;
						break;
					}
				}
			}
		},
		{
			url : 'js/functions.js'
		},
		{
			url : 'css/style.css'
		},
		{
			url : 'css/theme.green.css'
		},
		/*{
			url : 'css/cc.css'  //一旦队列中有加载不了的文件，则整个队列都会中止
		},*/
		{
			url : 'images/test.jpg',
			appendTo : 'body'
		},
		{
			url : 'images/test.png' 
		},
		{
			url : 'images/test.gif' 
		},
		{
			url : 'images/test.webp',
			before : function(queue) {
				queue.appendTo.innerHTML = "图片加载中....";
			},
			appendTo : document.getElementById("test")
		},
		{
			url : 'images/test.jpeg',
			appendTo : 'body'
		}
	]); 

	feloader.loadCSS({
		url : 'css/cc'
	}); 

	feloader.loadScript({
		url : 'js/xxx'
	});

	feloader.loadImage({
		url : 'images/xxx.png'
	});

	// 链式调用
	feloader.loadCSS({
		url : 'css/cc'
	}).loadScript({
		url : 'js/xxx'
	}).loadImage({
		url : 'images/xxx.png'
	});

	console.log(feloader);
});