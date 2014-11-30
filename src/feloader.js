/*!
	FeLoader v1.1.0 | a simple front-end file/Resources (queue) loader | MIT License | By: Pandao | E-mail: pandao@vip.qq.com | UpdateTime:  2014-11-30 17:24:40   
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

	exports.map    = [];

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
		var url = queue.url; 

		if(/.css/.test(url)) { 
			_this.loadCSS(queue);
		} else if(/.jpg|.jpeg|.png|.gif|.webp/.test(url)) { 
			_this.loadImage(queue);
		} else {
			_this.loadScript(queue);
		}
	}; 

	exports.loadScript = function(queue) {

		var url = (/.js$/.test(queue.url)) ? queue.url : queue.url+".js";  

		if(!_this.map[url]) {

			var script = document.createElement("script");
			script.setAttribute("charset", "utf-8");
			script.type="text/javascript";

			if(typeof (queue.before) !== "undefined") {
				_this.beforeHandler(queue);
			}

			script.onload = script.onreadystatechange = function() {  
				_this.map[url] = url;
				_this.callbackHandler(queue);
			};
						
			script.onerror = function() {
				_this.errorHandler(url);
			};
			 
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
		} else {
			console.info("[Feloader] [info] "+url+" is loaded, break;");

			_this.index ++;
			_this.queueLoad();
		}

		return _this;
	};

	exports.loadCSS = function(queue) { 

		var url = (/.css$/.test(queue.url)) ? queue.url : queue.url+".css";  

		if(!_this.map[url]) {

			var css = document.createElement("link");
			css.rel = "stylesheet"; 
			css.type = "text/css";

			if(typeof (queue.before) !== "undefined") {
				_this.beforeHandler(queue);
			}

			css.onload = css.onreadystatechange = function() { 
				_this.map[url] = url;
				_this.callbackHandler(queue);
			};	
			
			css.onerror = function() {
				_this.errorHandler(url);
			};

			css.href = url; 
			head.appendChild(css);	

		} else {

			console.info("[Feloader] [info] "+url+" is loaded, break;");

			_this.index ++;
			_this.queueLoad();
		}

		return _this;
	};

	exports.loadImage = function(queue) { 

		var img = new Image();

		if(typeof (queue.before) !== "undefined") {
			_this.beforeHandler(queue);
		}

		img.onload = function() { 

			var appendTo = (typeof (queue.appendTo) == "undefined" || queue.appendTo == "body") ? document.body :  queue.appendTo;
			
			if (typeof (queue.width) !== "undefined") {
				img.width = queue.width;
			}

			if (typeof (queue.height) !== "undefined") {
				img.height = queue.height;
			} 

			if(typeof (queue.before) !== "undefined") {
				appendTo.innerHTML = ""; 
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

	exports.beforeHandler = function(queue) {
		var before = queue.before || (function() { return true; });	  

		before(queue);
	};

	exports.callbackHandler = function(queue) {

		var wait = queue.wait || false;
		var callback = queue.callback || (function() { return true; });	  
		
		if (wait) {	  
			if(callback(queue)) {
				if(_this.index < _this.count - 1) {
					_this.index ++;
					_this.queueLoad();
				}
			} 				
		} else {
			
			callback(queue);
			
			if(_this.index < _this.count - 1) {
				_this.index ++;
				_this.queueLoad();
			}
		} 

		console.log(_this.map);
	};

	exports.errorHandler = function(url) {

		if(console) console.error("[Feloader] [Error] Can't load file "+url+".");
	};
})); 