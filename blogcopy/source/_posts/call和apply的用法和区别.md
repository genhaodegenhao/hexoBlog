---
title: call和apply的小总结
date: 2016-05-26 22:09:02
tags: call apply
---
### call和apply两者的相同点：
a） 产生的效果或作用完全相同；

b） 至少有一个参数；

c） 第一个参数必须有且是一个对象（Object）。

### 不同点：
call 的第二个参数可以是任意类型；

apply的第二个参数必须是数组，也可以是arguments。

明白：**B.Function.call(A,arg,arg)**

**表示“A对象调用B对象的某个方法”；**

**B.Function.apply(A,args)**

**“A对象应用B对象的某个方法”。**

再结合例子更深刻的去理解：

**栗子1：**

	function add(a,b)  
	{  
  	  alert(a+b);  
	}  
	function sub(a,b)  
	{  
	    alert(a-b);  
	}    
	add.call(sub,3,1); 	//4	
这个例子中的意思就是用 add 来替换 sub，add.call(sub,3,1) == add(3,1) ，所以运行结果为：alert(4); // 注意：js 中的函数其实是对象，函数名是对 Function 对象的引用。
 
**栗子2：**
 
 	function Animal(){    
  	 	  this.name = "Animal";    
   	 	  this.showName = function(){    
        		alert(this.name);    
    	  }    
	}     
	function Cat(){    
    	this.name = "Cat";    
	}     
	var animal = new Animal();    
	var cat = new Cat();       
	animal.showName.call(cat);		//Cat
call 的意思是把 animal 的方法放到cat上执行，原来cat是没有showName() 方法，现在是把animal 的showName()方法放到 cat上来执行，所以this.name 应该是 Cat。

**栗子3：**    
	
	function Animal(name){      
   		this.name = name;      
   	 	this.showName = function(){      
      	 	 alert(this.name);      
   		 }      
	}         
   	function Cat(name){    
    Animal.call(this, name);    
	}       
	var cat = new Cat("Black Cat");     
	cat.showName(); 	//Black Cat
Animal.call(this) 的意思就是使用 Animal对象代替this对象，那么 Cat中不就有Animal的所有属性和方法了吗，继承的方法，Cat对象就能够直接调用Animal的方法以及属性了。