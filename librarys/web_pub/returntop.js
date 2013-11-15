document.write('<div id="k_icopos" class="k_spico"><a href="javascript:void(0)" hidefocus="true" class="k_returntop bb" id="k_returntop" title="top">&nbsp;</a></div><style>.k_spico {width:50px;height:50px;position:fixed;_position:absolute;display:none;cursor:pointer;}.k_returntop {display:block;width:50px;height:50px;background:url(http://csdnimg.cn/www/images/top_arrow.png) no-repeat 0 0;}.k_returntop:hover {filter:alpha(opacity=60);opacity:0.6;text-decoration:none;}</style>');
function addEvent(obj,type,fn){
	if(!obj){return null;}
	if(obj.addEventListener){
		obj.addEventListener(type,function (ev){
			var rtn=fn.call(obj,ev);
			if(rtn==false){
				ev.cancelBubble=true;
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
function ReturnTop(obj,obj2,num,num2){
	if(!obj){return null;}
	this.obj = document.getElementById(obj);
	this.obj2 = document.getElementById(obj2);
	this.bSys = true;
	this.scrollTop = 0;
	this.timer = null;
	this.iSpeed = 0;
	this.iTop = 0;
	this.iLeft = 0;
	this.oBottom = num;
	this.oWidth = num2;
	var _this = this;
	addEvent(window,'scroll',function(){
		_this.moveFn();	
	})
	addEvent(window,'resize',function(){
		_this.moveFn();
	})
}
ReturnTop.prototype.moveFn = function(){
	var _this = this;
	var GLOBAlIE6= /msie 6/ig.test(window.navigator.userAgent) && !/msie [1-57-9]/ig.test(window.navigator.userAgent);
	this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	this.iTop = document.documentElement.clientHeight-this.oBottom+this.scrollTop;
	this.iLeft = (document.documentElement.clientWidth-this.oWidth)/2+this.oWidth;
	if(this.scrollTop>0){
		this.obj.style.display = 'block';
		this.obj.style.left = this.iLeft + 'px';
		if(GLOBAlIE6){
			this.obj.style.top = this.iTop + 'px';
			if((css(document.body,'backgroundAttachment') !== "fixed") && (css(document.body,'backgroundImage') === "none")){
				document.body.style.backgroundRepeat = "no-repeat";
				document.body.style.backgroundImage = "url(about:blank)";
				document.body.style.backgroundAttachment = "fixed";
			}
		}else {
			this.obj.style.top = this.iTop-this.scrollTop + 'px';
		}
	}else {
		this.obj.style.display = 'none';
	}
	if(!this.bSys){
		clearInterval(_this.timer);
	}
	this.bSys = false;
	this.obj2.onclick =  function(){
		_this.topFn();
		_this.bSys = false;
	}
}
ReturnTop.prototype.topFn = function(){
	var _this = this;
	clearInterval(_this.timer);
	this.timer = setInterval(function(){
		_this.setToFn();
	},50)
}
ReturnTop.prototype.setToFn = function(){
	var _this = this;
	this.iSpeed = Math.floor(-this.scrollTop/8);
	if(this.scrollTop==0){
		clearInterval(_this.timer);
	}
	this.bSys = true;
	document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + this.iSpeed;
}
var toTop = new ReturnTop('k_icopos','k_returntop',200,980);