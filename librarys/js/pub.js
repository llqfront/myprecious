/**
	{
		version : 'v1',
		date : '2014-09-12',
		author: 'liuliqing@jd.com'	
	}
	use method:
	railwayCfg.toDecide('北京') // true false
	railwayCfg.doSearch('#innerFrom'); // input id
	railwayCfg.defaultClick(input); input id
*/
/* pub */

var kpUnit = {};
kpUnit.Q = function (arg){
	this.aElements = [];
	switch (typeof arg){
		case 'string':
			switch(arg.charAt(0)){
				case '#':
					if(/\s/.test(arg)){
						var aArg = arg.split(' ');
						this.aElements = kpUnit.getEle(aArg[0],aArg[1]);
					}else{
						this.aElements.push(document.getElementById(arg.substring(1)));
					}
					break;
				default:
					this.aElements = kpUnit.getEle(document,arg);
					break
				}
			break;
		case 'function':
			kpUnit.addEvent(window,'load',arg);
			break;
	}
	return this.aElements;
}
kpUnit.getEle = function (f,s){
	var result = [];
	var elements = null;
	if(s.charAt(0) == '.'){
		if(typeof f === 'string'){
			var par = document.getElementById(f.substring(1));
			if(!par){
				return result;
			}else{
				elements = par.getElementsByTagName('*');
			}
		}else if(typeof f === 'object' && f!=null){
			elements = f.getElementsByTagName('*');
		}else{
			elements = [];
		}
		for(var i=0;i<elements.length;i++){
			if(/\s/.test(elements[i].className)){
				var names = elements[i].className.split(' ');
				if(kpUnit.strComper(s.substring(1),names) === true){
					result.push(elements[i]);
				}
			}else{
				if(elements[i].className == s.substring(1)){
					result.push(elements[i]);
				}
			}
		}
	}else{
		if(typeof f === 'string'){
			var par = document.getElementById(f.substring(1));
			if(!par){
				return result;
			}
			result = document.getElementById(f.substring(1)).getElementsByTagName(s);
		}else if(typeof f === 'object'){
			result = f.getElementsByTagName(s);
		}
	}
	return result;
};
kpUnit.strComper = function (a,b){
	for(var i=0;i<b.length;i++){
		if(a == b[i]){
			return true;
			break;
		}
	}
};
kpUnit.addEvent = function(obj,type,fn){
	if(!obj){return null;}
	if(obj.addEventListener){
		obj.addEventListener(type,function (ev){
			var rtn=fn.call(obj,ev);
			if(rtn==false){
				// ev.cancelBubble=true;
				ev.stopPropagation ? ev.stopPropagation() : (ev.cancelBubble=true);
				ev.preventDefault();
			}
		},false);
	}else{
		obj.attachEvent('on'+type,function (){
			var rtn=fn.call(obj,event);
			if(rtn==false){
				event.cancelBubble=true;
				return false;
			}
		})
	}
};
kpUnit.contains = function(root, el) { 
	if (root.compareDocumentPosition) 
		return root === el || !!(root.compareDocumentPosition(el) & 16); 
		if (root.contains && el.nodeType === 1){ 
			return root.contains(el) && root !== el; 
	} 
	while ((el = el.parentNode)) 
	if (el === root) return true; 
	return false; 
}
kpUnit.css = function(obj,attr,value){
	if(!obj)return null;
	if(arguments.length===2){	
		if(typeof attr == 'string'){
			if(attr == 'float'){
				if(-[1,]){
					attr = 'cssFloat';
				}else {
					attr = 'styleFloat';
				}
			}
			if(obj.currentStyle){
				return obj.currentStyle[attr];
			}else {
				return getComputedStyle(obj,false)[attr];
			}
		}else {
			for(var key in attr){
				obj.style[key] = attr[key];
				if(key=='float'){
					if(-[1,]){
						key = 'cssFloat';
						obj.style[key] = attr['float'];
					}else {
						key = 'styleFloat';
						obj.style[key] = attr['float'];
					}
				}
			}
		}
	}else if(arguments.length===3){
		if(attr == 'float'){
			if(-[1,]){
				attr = 'cssFloat';
			}else {
				attr = 'styleFloat';
			}
		}
		obj.style[attr] = value;
	}
}
kpUnit.TabSwidth = function(btn,box,type,sClass,iN,t){
	var aBtn = kpUnit.Q(btn);
	var aBox = kpUnit.Q(box);
	for(var i=0;i<aBtn.length;i++){
		aBox[i].style.display = '';
		aBtn[i].className = '';
	}
	aBox[iN].style.display = 'block';
	aBtn[iN].className = sClass;
	var btnNone = aBtn[iN];
	var boxNone = aBox[iN];
	for(var i=0;i<aBtn.length;i++){
		aBtn[i].index = i;
		aBtn[i][type] = function(e){
			if(btnNone){
				btnNone.className = '';
				boxNone.style.display = 'none';
			}
			if(t){
				if(this.index>0){
					railwayCfg.cPageSplit(railwayCfg.letter[this.index-1]);
				}
			}
			aBtn[this.index].className = sClass;
			aBox[this.index].style.display = 'block';
			btnNone = aBtn[this.index];
			boxNone = aBox[this.index];
		}
	}
}
kpUnit.getPos = function(obj,bCurrent){
	var pos = {x:0,y:0};
	if(!obj){
		return pos;
	}
	if(bCurrent){
		pos.x = parseInt(obj.getBoundingClientRect().left);
		pos.y = parseInt(obj.getBoundingClientRect().top);
	}else{
		pos.x = parseInt(obj.getBoundingClientRect().left + (document.documentElement.scrollLeft||document.body.scrollLeft),10);
		pos.y = parseInt(obj.getBoundingClientRect().top + (document.documentElement.scrollTop||document.body.scrollTop));
	}
	return pos;
}
kpUnit.addClass = function(obj,name){
	if(!obj || kpUnit.haveClass(obj,name)){
		return null;
	}
	if(obj.className!==''){
		obj.className += ' ';
		obj.className += name;
	}else{
		obj.className = name;
	}
}
kpUnit.removeClass = function(obj,name){
	if(!obj){return null;}
	var sClass = obj.className;
	var aClass = sClass.split(' ');
	for (var i=0,length=aClass.length;i<length;i++ ){
		if(name == aClass[i]){
			aClass[i] = aClass[length-1];
			aClass.pop(aClass[length-1]);
			break;
		}
	}
	obj.className = aClass.join(' ');
}
kpUnit.haveClass = function(obj,className){
	if(!obj){return false}
	var objClass = obj.className;
	if(!objClass){
		return false;
	}
	var allName = obj.className.split(' ');
	var res = false;
	for(var i=0,len = allName.length;i<len;i++){
		if(allName[i] == className){
			res = true;
			break;
		}
	}
	return res;
}
kpUnit.placeholder = function(oInput,defText){ 
	var value = defText || oInput.value
	oInput.style.color="#999"
	if(oInput.value==''){ 
		this.value=value; 
	} 
	oInput.onfocus=function(){ 
		if(this.value==value){ 
			this.value='';
			this.style.color="#333"
		} 
	}; 
	oInput.onblur=function(){ 
		if(this.value==''){
			this.value=value;
			this.style.color="#999"
		} 
	}
}