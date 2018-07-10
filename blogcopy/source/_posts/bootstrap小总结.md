---
title: bootstrap小总结
date: 2016-05-18 17:14:54
tags: bootstrap
---
## 1、bootstrap 排版
全局样式style.css：

1、移除body的margin声明

2、设置body的背景色为白色

3、为排版设置了基本的字体、字号和行高

4、设置全局链接颜色，且当链接处于悬浮“:hover”状态时才会显示下划线样式

### 标题 h1-h6

HTML 中的所有标题标签，&lt;h1&gt; 到 &lt;h6&gt; 均可使用。另外，还提供了 .h1 到 .h6 类选择器，为的是给内联（inline）属性的文本赋予标题的样式。

**1、重新设置了margin-top和margin-bottom的值**

**2、h1~h3重置后的值都是20px；h4~h6重置后的值都是10px**

**3、所有标题的行高都是1.1（也就是font-size的1.1倍）,而且文本颜色和字体都继承父元素的颜色和字体**

**4、固定不同级别标题字体大小，h1=36px，h2=30px，h3=24px，h4=18px，h5=14px和h6=12px**

在标题内还可以包含&lt;small&gt; 标签或赋予 .small 类的元素，可以用来标记副标题。
	
	<h2>Bootstrap heading <small>Secondary Text</small></h2>

<h2>Bootstrap heading <small style="color:gray;"> Secondary text</small></h2>

### p 标签
&lt;p&gt; (段落)元素还被设置底部外边距（margin）10px。
<pre>
	Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
</pre>
通过添加 .lead 类可以让段落突出显示。
<pre style="font-size:21px;font-family:宋体">
	Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
</pre>

### 强调内容的标签
&lt;lead&gt;一般配合段落标签使用

&lt;small&gt;

&lt;strong&gt;

&lt;em&gt;      &lt;i&gt;   &lt;cite&gt;


**强调相关的类**

	text-muted：  提示，使用浅灰色（#999）
	text-primary：主要，使用蓝色（#428bca）
	text-success：成功，使用浅绿色(#3c763d)
	text-info：   通知信息，使用浅蓝色（#31708f）
	text-warning：警告，使用黄色（#8a6d3b）
	text-danger： 危险，使用褐色（#a94442）

### 文本对齐风格
	text-left：   左对齐
	text-center： 居中对齐
	text-right：  右对齐
	text-justify：两端对齐


### 列表
1、ul 、 ol <span style="color:red;">去序列</span>：
	
	class=“list-unstyled“

2、ul 、 ol <span style="color:red;">水平排列</span>（把垂直列表换成水平列表，而且去掉项目符号（编号），保持水平显示）
	
	class=“list-inline”

3、dl水平列表（屏幕大于768px的时候，添加类名“.dl-horizontal”才具有水平定义列表效果）

	class=“dl-horizontal”

### 图片
使用方法非常简单，只需要在<img>标签上添加对应的类名
**img-responsive**：响应式图片，主要针对于响应式设计
	
	img-rounded：   圆角图片
	img-circle：    圆形图片
	img-thumbnail： 缩略图片
自己动手添加并查看相应的效果吧~ ~ ~

### bootstrap图标
Bootstrap框架中也为大家提供了近200个不同的icon图片，而这些图标都是使用CSS3的@font-face属性配合字体来实现的icon效果。

任何行级元素都可以，通常使用**span**标签做图标容器

**<span style="color:blue;">可登陆bootstrap网站查看  <http://v3.bootcss.com/components/#thumbnails><span>**

用法很简单，只需将图标下的英文复制粘贴到class里即可：

	<span class="glyphicon glyphicon-ok"></span>

![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f3ztie0k06j30nj0m1jy5.jpg)

## 2、bootstrap-表格
### 基础实例

	<table class="table"></table>
	
![](http://ww2.sinaimg.cn/mw690/005SH7k8gw1f3ztzl23puj312105sgn9.jpg)

### 条纹状表格
通过 .table-striped 类可以给 <tbody> 之内的每一行增加斑马条纹样式。

**条纹状表格是依赖 :nth-child CSS 选择器实现的，而这一功能不被 Internet Explorer 8 支持。**

![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f3ztzjbzlxj312906eq4n.jpg)

### 带边框的表格
添加 .table-bordered 类为表格和其中的每个单元格增加边框。

![](http://ww4.sinaimg.cn/mw690/005SH7k8gw1f3ztzj0d4dj311t06njt5.jpg)


### 鼠标悬停
通过添加 .table-hover 类可以让 <tbody> 中的每一行对鼠标悬停状态作出响应。

### 紧缩表格
通过添加 .table-condensed 类可以让表格更加紧凑，单元格中的内补（padding）均会减半。

![](http://ww4.sinaimg.cn/mw690/005SH7k8gw1f3ztzjwd9ej311i05wtai.jpg)

### 状态类
通过这些状态类可以为行或单元格设置颜色。


Class	描述

	.active	    鼠标悬停在行或单元格上时所设置的颜色
	.success	标识成功或积极的动作
	.info	    标识普通的提示信息或动作
	.warning	标识警告或需要用户注意
	.danger	    标识危险或潜在的带来负面影响的动作


### 响应式表格
将任何 .table 元素包裹在 .table-responsive 元素内，即可创建响应式表格，其会在小屏幕设备上（小于768px）水平滚动。当屏幕大于 768px 宽度时，水平滚动条消失。

	<div class="table-responsive">
  		<table class="table">
     	...
  		</table>
	</div>

## 3、bootstrap表单
### 基本实例
单独的表单控件会被自动赋予一些全局样式。所有设置了 `.form-control `类的 `&lt;input&gt;`、`&lt;textarea&gt;` 和 `&lt;select&gt;` 元素都将被默认设置宽度属性为 width: 100%;。 将 `label` 元素和前面提到的控件包裹在 `.form-group `中可以获得最好的排列。

	<form role="form">告诉辅助设备（如屏幕阅读器）这个元素所扮演的角色是个表单</form>

	<form role="button">告诉设备，这是个按钮，可以点击。本质上是增强语义性，增强组件的可访问性、可用性</form>

**不要将表单组合输入框组混合使用，建议将输入框组嵌套到表单组中使用。**

	<form>
 		 <div class="form-group">
  			  <label for="exampleInputEmail1">Email address</label>
   			  <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email">
  		 </div>
  		 <div class="form-group">
   			  <label for="exampleInputPassword1">Password</label>
   			  <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
   		 </div>
  		 <div class="form-group">
    		  <label for="exampleInputFile">File input</label>
   			  <input type="file" id="exampleInputFile">
     		  <p class="help-block">Example block-level help text here.</p>
         </div>
  		 <div class="checkbox">
   			  <label>
     			  <input type="checkbox"> Check me out
   		      </label>
 		 </div>
  		 <button type="submit" class="btn btn-default">Submit</button>
	</form>
	
**多个控件可以排列在同一行:**

	<form class="form-inline">
  		<div class="form-group">
   			 <label for="exampleInputName2">Name</label>
   			 <input type="text" class="form-control" id="exampleInputName2" placeholder="Jane Doe">
  		</div>
  		<div class="form-group">
  			  <label for="exampleInputEmail2">Email</label>
  			  <input type="email" class="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com">
  		</div>
 	    <button type="submit" class="btn btn-default">Send invitation</button>
	</form>


### 水平排列的表单
通过为表单添加 `.form-horizontal` 类，并联合使用 Bootstrap 预置的栅格类，可以将 label 标签和控件组水平并排布局。这样做将改变 `.form-group` 的行为，使其表现为栅格系统中的行（row），因此就无需再额外添加 .row 了。

### 单选和多选框
多选框`（checkbox）`用于选择列表中的一个或多个选项，而单选框`（radio）`用于从多个选项中只选择一个。

设置了` disabled `属性的单选或多选框都能被赋予合适的样式。对于和多选或单选框联合使用的 &lt;label&gt; 标签，如果也希望将悬停于上方的鼠标设置为“禁止点击”的样式，请将 .disabled 类赋予 `.radio、.radio-inline、.checkbox、.checkbox-inline 或 &lt;fieldset&gt;。`

多选框：

	<div class="checkbox">
 		 <label>
 			 <input type="checkbox" value="">
    		Option one is this and that&mdash;be sure to include why it's great
  		 </label>
	</div>
	<div class="checkbox disabled">
 		 <label>
  			  <input type="checkbox" value="" disabled>
   			 Option two is disabled
  		</label>
	</div>

单选框：

	<div class="radio">
 		 <label>
  		  	<input type="radio" name="optionsRadios" id="optionsRadios2" value="option2">
  		  Option two can be something else and selecting it will deselect option one
  		</label>
	</div>
	<div class="radio disabled">
 		 <label>
  			  <input type="radio" name="optionsRadios" id="optionsRadios3" value="option3" disabled>
  			  Option three is disabled
 		 </label>
	</div>

**通过将 .checkbox-inline 或 .radio-inline 类应用到一系列的多选框（checkbox）或单选框（radio）控件上，可以使这些控件排列在一行。**
