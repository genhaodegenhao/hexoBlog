---
title: this的用法
date: 2016-05-26 21:42:18
tags: this
---
### 【场景1】全局环境中的this指向全局对象
	this.a = 10;
	alert(a);//10
	b = 20;
	alert(this.b);//20
	var c = 30;
	alert(this.c);//30
	
### 【场景2】对象内部函数的this指向调用函数的当前对象
	var a = 10;
	var bar = {
	 	a: 20,
	 	test: function(){
	 		 alert(this.a);
	 	}
	}
	bar.test();//20
	
### 【场景3】全局环境函数的this指向全局对象
	var a = 10;
	function foo(){
 		alert(this.a);
	}
	foo();//10
	
### 【场景4】匿名函数中的this指向全局对象
	var a = 10;
	var foo = {
	 	a: 20,
	 	fn: (function(){
			alert(this.a);
	 	})()
	}
	foo.fn//10
	
### 【场景5】setInterval和setTimeout定时器中的this指向全局对象
	var a = 10;
	var oTimer1 = setInterval(function(){
		 var a = 20;
	 	 alert(this.a);//10
	 	 clearInterval(oTimer1);
	},100);
	
### 【场景6】eval中的this指向调用上下文中的this
	(function(){
 	eval("alert(this)");//[object Window]
	})();
	function Foo(){
	 	this.bar = function(){
	 		eval("alert(this)");//[object Object]
	 	}
	}
	var foo = new Foo();
	foo.bar();
	
### 【场景7】构造函数中的this指向构造出的新对象
	function Person(name,age){
 		this.name = name;
		this.age = age;
 		this.sayName = function(){
 		 	alert(this.name);
 		}
	}
	var p1 = new Person('lily','20');
	p1.sayName();//'lily'
	
### 【场景8】new Function中的this指向全局对象
	(function(){
 		var f = new Function("alert(this)");
		f();//[object Window]
	})();
	function Foo(){
	 	this.bar = function(){
	  		var f = new Function("alert(this)");
	  		f();//[object Window]
	 	}
	}
	var foo = new Foo();
	foo.bar();
	
### 【场景9】apply和call中的this指向参数中的对象
	var a = 10;
	var foo = {
		a: 20,
		fn: function(){
	 		 alert(this.a);
		 }
	};
	var bar ={
		a: 30
	}
	foo.fn.apply();//10(若参数为空，默认指向全局对象)
	foo.fn.apply(foo);//20
	foo.fn.apply(bar);//30
	
	
### 【复合场景1】
	var someone = {
 		name: "Bob",
 		showName: function(){
 			 alert(this.name);
 		}
	};
	var other = {
		 name: "Tom",
		 showName: someone.showName
	}
	other.showName();　　//Tom
 
//以上函数相当于
 
	var other = {
	 	name: "Tom",
		showName: function(){
 			 alert(this.name);
 		}
	}
	other.showName();　　//Tom
	
### 【复合场景2】
	var name = 2;
	var a = {
		 name: 3,
 		 fn: (function(){
 			 alert(this.name);
 		 })(),
		 fn1:function(){
			 alert(this.name);
		 }
	}
	a.fn;//2[匿名函数中的this指向全局对象]
	a.fn1();//3[对象内部函数的this指向调用函数的当前对象]
	
### 【复合场景3】
	var name = "Bob"; 
	var nameObj ={ 
 		name : "Tom", 
		showName : function(){ 
 			alert(this.name); 
		}, 
 		waitShowName : function(){
 			 var that = this;
 			 setTimeout(function(){
  				 that.showName();
 			 }, 1000);
 		}
	}; 
	nameObj.waitShowName();//"Tom"[that=this改变this的指向，使this从指向全局变量变化到指向nameObj]
 
 <span style="width:100%;height:1px;background:#000;"></span>
 
	var name = "Bob"; 
	var nameObj ={ 
		 name : "Tom", 
		 showName : function(){ 
 		 	alert(this.name); 
 		 }, 
		 waitShowName : function(){
 			var that = this;//that指向nameObj
 			setTimeout(function(){
  				 (function(){ 
					alert(this.name);
  				 })();
 			 }, 1000);
 		 }
	}; 
	nameObj.waitShowName();// 'Bob'[形成匿名函数，this指向全局变量]
