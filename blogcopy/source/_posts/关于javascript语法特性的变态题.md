---
title: 关于javascript语法特性的变态题
date: 2016-05-23 21:18:50
tags: javascript语法特性
---
### 1、
		(function () { 
    		return typeof arguments; 
		})(); 
A. "object"
B. "array"
C. "arguments"
D. "undefined"

<span style="color:red;">答案："object"</span>

**arguments 是对象，typeof类型是 "object" **

### 2、
	var f = function g() {
        return 23;
    };
	typeof g();
A. "number"
B. "undefined"
C. "function"
D. Eorror

<span style="color:red;">答案：Error</span>

**在 JS 里，声明函数只有 2 种方法：**

**第 1 种： function foo(){...} （函数声明）**

**第 2 种： var foo = function(){...} （等号后面必须是匿名函数，这句实质是函数表达式）**

g 未定义，这里如果求 typeof g ，会返回 undefined。

### 3、
	(function (x) {
  	  delete x;
  	  return x;
	})(1);
A. 1
B. null
C. undefined
D. Error

<span style="color:red;">答案：1</span>

**delete 不能删除变量，也不能删除函数，可以删除对象的属性。。**

### 4、
	var y = 1,
 	   x = y = typeof x;
	x;
A. 1
B. "number"
C. undefined
D. "undefined"

<span style="color:red;">答案："undefined"</span>

**先定义了 y 并赋值为 1，然后将 typeof x 赋值给 y ，此时 x 未定义，故为 "undefined"，最后将 y 的值赋给 x。**

### 5、
	(function f(f) {
 	   return typeof f();
	})(function () {
   		return 1;
	});
A. "number"

B. "undefined"

C. "function"

D. Error

<span style="color:red;">答案："number"</span>

**在函数里的 f() 其实是参数的那个 f 的执行结果，所以是 typeof 1，也就是 "number"。**

### 6、
	var foo = {
    bar: function () {
        return this.baz;    
        },
 		  baz: 1
	};
	(function () {
   	 return typeof arguments[0]();
	})(foo.bar);
A. "undefined"

B. "object"

C. "number"

D. "function"

答案暂略

### 7、
	var foo = {
 	   bar: function(){ return this.baz; },
 	   baz: 1
 	 }
 	 typeof (f = foo.bar)();
A. "undefined"

B. "object"

C. "number"

D. "function"

<span style="color:red;">答案："undefined"</span>

**因为CallExpression是不带有上下文信息，this会指向global；
当你以foo.bar() 调用时，被调用的function是「MemberExpression」，而如果进行了f=foo.bar()赋值之后，那么function就会变成「CallExpression」了，因此this绑定就失效了。**

### 8、
	var f = (function f(){ return "1"; }, function g(){ return 2; })();
  	typeof f;
A. "string"

B. "number"

C. "function"

D. "undefined"

<span style="color:red;">答案："number"</span>

**前面的函数被后面的覆盖。**

### 9、
	var x = 1;
    if (function f(){}) {
  	  x += typeof f;
 	 }
 	 x;
A. 1

B. "1function"

C. "1undefined"

D. NaN

<span style="color:red;">答案："1undefined"</span>

**括号内的 function f(){} 不是函数声明，会被转换成 true ，因此 f 未定义。**

### 10、
	var x = [typeof x, typeof y][1];
	typeof typeof x;
A. "number"

B. "string"

C. "undefined"

D. "object"

<span style="color:red;">答案："string"</span>

**第一行执行完后 x === "undefined" ，所以连续求 2 次 typeof 还是 "string"**

### 11、
	 (function(foo){
  	  return typeof foo.bar;
 	 })({ foo: { bar: 1 } });
A、“undefined”

B、“object”

C、“number”

D、Error

<span style="color:red;">答案："undefined"</span>

**typeof foo.bar 中的 foo 是参数，不多解释了。**


### 12、
	(function f() {
    function f() {
        return 1;
    }
    return f();
    function f() {
        return 2;
    }
	})();
A、1

B、2

C、Error (e.g. “Too much recursion”)

D、undefined

<span style="color:red;">答案：2</span>

**由于`声明提前`，后面的 f() 会覆盖前面的 f()。**

### 13、
	function f(){ return f; }
	new f() instanceof f;
A、true

B、false

<span style="color:red;">答案：false</span>

**构造函数不需要显式声明返回值，默认返回this值。当显式声明了返回值时，如果返回值是非对象（数字、字符串等），这个返回值会被忽略，继续返回this值。但是如果返回值是对象，那么这个显式返回值会被返回。
因为 f() 内部返回了自己，故此时 new f() 的结果和 f 相等。**