FeLoader
========

A simple front-end file/Resources (queue) loader.

一个简单的前端资源队列加载工具，支持JS、CSS和图片的动态加载。

适用于简单的无需严格模块化和需要使用变量上下文环境的应用场景。

####兼容情况

- IE6+
- Webkit：Chrome/Safari/Opera
- Firefox

####安装方法

	<script type="text/javascript" src="dist/feloader.min.js"></script>

通过bower安装：

	bower install feloader

####使用方法

参数说明：

	{
		url      : String       路径或者网址,
		wait     : Boolean      是否暂停/等待，默认为false，等待callback回调函数的执行完成，再进入下一个加载,
		before   : Function     加载前的处理，例如加载图片的loading,
		callback : Function     加载后的回调函数，必须return true，这样队列才能继续下一个加载；
								另外在回调里嵌套另一个队列是同步的，这样就不能保持是顺序的加载了，
		appendTo : HTMLElement  追加到某个元素里，值为元素对象，默认值为'body'，加载脚本和CSS时只能是'body'或者'head',
		width    : Number/%/px  加载图片时才有效,
		height   : Number/%/px  同上
	}

1、队列加载

	
	<script type="text/javascript" src="dist/feloader.min.js"></script>
	<script type="text/javascript"> 
		feloader.queue([
			{url : "js/config.js"},
			{url : "js/underscore.js"}, 
			{
				wait : true,
				url : "js/jquery.min.js", 
				callback : function() { 
					console.log("jquery loaded!");  
					//执行某些操作后，再进入下一个加载
					for (var i=0; i<10000; i++) {
						if(i >= 9999) {
							console.log(i);
							return true; 
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
	</script> 

> 说明1：队列可以嵌套，但无法继续嵌套外的队列（因为不能保证队列的加载顺利），所以建议安排在依赖关系的最后进行另一个队列。
> 
> 说明2：队列中如果有重复的JS或CSS文件，只加载第一个，其他的直接跳过。 

2、单个加载:

	feloader.loadCSS({
		url : 'css/style'  //这里可以省略扩展名
	}); 

	feloader.loadScript({
		url : 'js/config'
	});

	feloader.loadImage({
		url : 'images/test.jpg'
		appendTo: document.body,
		width: 100,
		height: 100
	});

	// 链式调用
	feloader.loadCSS({
		url : 'css/theme.green'
	}).loadScript({
		url : 'js/underscore'
	}).loadImage({
		url : 'images/test.png'
	});

> 说明：非队列加载不能保证加载顺序；

3、在Sea.js中使用：

	<script src="js/sea.js"></script>
	<script type="text/javascript">
		seajs.config({ 
			alias : {
				'feloader' : '../../dist/feloader.min'
			}
		});

		seajs.use("./js/main"); 
	</script>

	//main.js
	define(function(require){
		var feloader = require('feloader'); 
	
		feloader.loadCSS({
			url : 'css/basic'
		}).loadScript({
			url : 'js/config'
		}).loadImage({
			url : 'images/test.png', 
			before : function(queue) {
				queue.appendTo.innerHTML = "图片加载中....";
			},
			appendTo : document.getElementById("test")
		});

		// 队列，略
	
		console.log(feloader);
	});
	
4、在Require.js中使用：

	<script src="js/require-2.1.15.min.js"></script>
	<script type="text/javascript"> 　　
		require.config({
	　　　　paths: {
	　　　　　　"feloader": "../dist/feloader.min"
	　　　　}
	　　});

	　　require(['feloader'], function (feloader){

			feloader.loadCSS({
				url : 'css/style'
			}); 

			feloader.loadScript({
				url : 'js/config'
			});

			feloader.loadImage({
				url : 'images/test.jpg',
				appendTo: document.body,
				width: 100,
				height: 100
			});

			// 链式调用
			feloader.loadCSS({
				url : 'css/theme.green'
			}).loadScript({
				url : 'js/underscore'
			}).loadImage({
				url : 'images/test.png'
			});
	　　});
	</script>

####License

The MIT License ([MIT](https://raw.githubusercontent.com/pandao/feloader/master/LICENSE "MIT"))

Copyright (c) 2014 Pandao