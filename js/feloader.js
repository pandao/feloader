/*!
	FeLoader v 0.1 | a simple front-end file/Resources (queue) loader | MIT License | By: Pandao | E-mail: pandao@vip.qq.com | UpdateTime: 2014-11-29 19:22:09 
*/
;(function(feloader) {

	// CommonJS/Node.js
	if(typeof require === 'function' && typeof exports === "object" && typeof module === "object") {
		feloader(require, exports, module);
	}	
	// AMD/CMD/Sea.js
	else if(typeof define === "function") {
		define(feloader);
	} 
	else {
		feloader(function(){}, window['feloader']={}, {}); 
	}

}(function(require, exports, module) { 

	var _this = exports;
	var head = document.getElementsByTagName('head')[0]; 

	exports.index = 0;

	exports.count = 0;

	exports.queues = [];

	exports.appendTo = 'body';

	exports.queue = function (queues) {

		_this.queues = queues;
		
		if(typeof(queues) == "object" && queues.length) {
			_this.count = queues.length;
			_this.queueLoad();
		}

		return _this;
	};

	exports.queueLoad = function () { 

		var queue = _this.queues[_this.index];

		if(/.css/.test(queue.url)) {
			//console.log('Loading CSS');
			_this.loadCSS(queue);
		} 
		else if(/.jpg|.jpeg|.png|.gif|.webp/.test(queue.url)) {
			//console.log('Loading Image');
			_this.loadImage(queue);
		} else {
			_this.loadScript(queue);
		}
	}; 

	exports.loadScript = function(queue) {

		var url = (/.js$/.test(queue.url)) ? queue.url : queue.url+".js";  

		var script = document.createElement("script");
		script.setAttribute("charset", "utf-8");
		script.type="text/javascript";

		script.onload = script.onreadystatechange = function() { 
			_this.callbackHandler(queue);
		};
					
		script.onerror = function() {
			_this.errorHandler(url);
		};
		
		//script.defer = true;
		//script.async = true;
		script.src = url; 

		var appendTo = (typeof (queue.appendTo) == "undefined") ? _this.appendTo : queue.appendTo;
	
		if (appendTo == "body") 
		{
			document.body.appendChild(script);
		}
		else if (appendTo == "head") 
		{
			head.appendChild(script);
		} 

		return _this;
	};

	exports.loadCSS = function(queue) { 

		var url = (/.css$/.test(queue.url)) ? queue.url : queue.url+".css";  

		var css = document.createElement("link");
		css.rel = "stylesheet"; 
		css.type = "text/css";
		css.onload = css.onreadystatechange = function() { 
			_this.callbackHandler(queue);
		};	
		
		css.onerror = function() {
			_this.errorHandler(url);
		};

		css.href = url; 
		head.appendChild(css);	

		return _this;
	};

	exports.loadImage = function(queue) {

		var img = new Image();

		img.onload = img.onreadystatechange = function() { 

			var appendTo = (typeof (queue.appendTo) == "undefined" || queue.appendTo == "body") ? document.body :  queue.appendTo;
			
			if (typeof (queue.width) !== "undefined") {
				img.width = queue.width;
			}

			if (typeof (queue.height) !== "undefined") {
				img.height = queue.height;
			}

			appendTo.appendChild(img);

			_this.callbackHandler(queue);
		};	
		
		img.onerror = function() {
			_this.errorHandler(queue.url);
		};

		img.src = queue.url;

		return _this;
	};

	exports.callbackHandler = function(queue) {

		var wait = queue.wait || false;
		var callback = queue.callback || (function() { return true; });	  
		
		if (wait) {	  
			if(callback()) {
				if(_this.index < _this.count - 1) {
					_this.index ++;
					_this.queueLoad();
				}
			} 				
		} else {
			
			callback();
			
			if(_this.index < _this.count - 1) {
				_this.index ++;
				_this.queueLoad();
			}
		} 
	};

	exports.errorHandler = function(url) {

		if(console) console.error("[Feloader] [Error] Can't load file "+url+".");
	};
})); 