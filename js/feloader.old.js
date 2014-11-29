(function(document, window) { 	

    "use strict"; 

	var _this, feloader = _this = {
		vars : {},
		index : 0, 
		count : 0,
		queues : [],
		appendTo : 'body',

		queue : function (queues) {
			_this.queues = queues;
			
			if(typeof(queues) == "object" && queues.length) {
				_this.count = queues.length;
				return _this.queueLoad();
			}
		},

		callbackHandler : function(queue) {
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
		},

		loadScript : function(queue) {
			var script = document.createElement("script");
			script.setAttribute("charset", "utf-8");

			script.onload = script.onreadystatechange = function() { 
				_this.callbackHandler(queue);
			};
						
			script.onerror = function() {
				_this.errorHandler(queue.url);
			};
			
			script.async = true;
			script.src = queue.url; 

			var appendTo = (typeof (queue.appendTo) == "undefined") ? _this.appendTo : queue.appendTo;
		
			if (appendTo == "body") 
			{
				document.body.appendChild(script);
			}
			else if (appendTo == "head") 
			{
				var head = document.getElementsByTagName('head')[0];
				head.appendChild(script);
			} 
		},

		loadCSS : function(queue) {
			var css = document.createElement("link");
			css.rel = "stylesheet"; 
			css.type = "text/css";
			css.onload = css.onreadystatechange = function(){
				//console.log("css loaded");
				_this.callbackHandler(queue);
			};	
			
			css.onerror = function() {
				_this.errorHandler(queue.url);
			};

			css.href = queue.url;
			var head = document.getElementsByTagName('head')[0];
			head.appendChild(css);	
		},

		loadImage : function(queue) {
			var img = new Image();

			img.onload = img.onreadystatechange = function(){
				//console.log("img loaded");

				var appendTo = (typeof (queue.appendTo) == "undefined" || queue.appendTo == "body") ? document.body :  queue.appendTo;
				
				if (typeof (queue.width) != "undefined") {
					img.width = queue.width;
				}

				if (typeof (queue.height) != "undefined") {
					img.height = queue.height;
				}

				appendTo.appendChild(img);

				_this.callbackHandler(queue);
			};	
			
			img.onerror = function() {
				_this.errorHandler(queue.url);
			};

			img.src = queue.url;
		},

		errorHandler : function(url) {
			if(console) console.error("[Feloader] [Error] Can't load file "+url+".");
		},

		queueLoad : function () { 
			var queue = _this.queues[_this.index];

			if(/.css/.test(queue.url)) {
				//console.log('加载CSS');
				_this.loadCSS(queue);
			} 
			else if(/.jpg|.jpeg|.png|.gif|.webp/.test(queue.url)) {
				//console.log('加载Image');
				_this.loadImage(queue);
			} else {
				_this.loadScript(queue);
			}
		}
	};  

})(document, window);