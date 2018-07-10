---
title: 新的layout布局
date: 2016-09-27 14:30:18
tags: Render Section Page
---
### 要点：
A.Layout属性:等同于原来的MasterPageFile属性。

B.@RenderBody()方法:直接渲染整个View到占位符处,而不需要原来所使用的<asp:Content />。

C.@RenderPage()方法:渲染指定的页面到占位符处。

D.@RenderSection方法:声明一个占位符,和原来的<asp:ContentPlaceHolder />功能类似。

E.@section标记:对@RenderSection方法声明的占位符进行实现,和原来的<asp:Content />功能类似。

### 1.@RenderBody()方法的使用
首先在~/Views/Shared/下创建一个名为_MyLayout.cshtml的LayoutPage文件,并将默认的内容替换为如下:

	<!DOCTYPE html>
	<html>
	<head>
    	<title>@ViewBag.Title</title>
	</head>
	<body>
    	<div>
       	 开始渲染Body<br />
        	@RenderBody()
        	渲染Body结束<br />
    	</div>
	</body>
	</html>
然后打开在~/Views/Home/Index.cshtml文件并替换为如下的内容:
	
	@{
    	ViewBag.Title = "首页";
	}
	<div>
   	 	这里就是渲染Body啦。
	</div>
最后别忘记把~/Views/_ViewStart.cshtml中的Layout属性改为:
Layout = "~/Views/Shared/_MyLayout.cshtml";

浏览器输出：

开始渲染Body

这里就是渲染Body啦。

渲染Body结束

<p style="color:gray;">在此,你或许会有疑问了.在_Layout中定义的RenderBody()是Render那个页啊?

答:其实最后Render页的归属就是Render你所访问的那个页,比如你访问/Home/Index.那么Render就是Home控制器下的Index.cshtml这个文件, 如果访问的是/Ohter/SomePage时,那么Render的是Ohter控制器下的SomePage这个.cshtml!</p>

### 2.@RenderPage()方法的使用
在~/Views/Home/文件夹下新建立一个ViewPage1.cshtml文件,将内容改为如下:

	<div>
   		 这里是~/Views/Home/ViewPage1.cshtml
	</div>
并在原来的_MyLayout.cshtml文件中增加几行代码变成下面的这个样子:

	<!DOCTYPE html>
	<html>
	<head>
	    <title>@ViewBag.Title</title>
	</head>
	<body>
	    <div>
	        开始渲染Body<br />
	        @RenderBody()
	        渲染Body结束<br />
	        <br />
	        开始渲染其他页1<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束1<br />
	        开始渲染其他页2<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束2<br />
	        开始渲染其他页3<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束3<br />
	    </div>
	</body>
	</html>
在这里记住:@RenderBody()只能在_Layout.cshtml中使用一次,而@RenderPage()则可以使用多次!另外@RenderPage()是直接定位View页面，不会运行对应的Action方法。
### 3.@RenderSection方法和@section标记
@RenderSection()方法等价于<asp:ContentPlaceHolder />,用途为在Layout中声明一个占位符.
在原来的_MyLayout.cshtml文件中更改内容为如下:

	<!DOCTYPE html>
	<html>
	<head>
	    <title>@ViewBag.Title</title>
	</head>
	<body>
	    <div>
	        开始渲染Body<br />
	        @RenderBody()
	        渲染Body结束<br />
	        <br />
	        开始渲染其他页1<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束1<br />
	        开始渲染其他页2<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束2<br />
	        开始渲染其他页3<br />
	        @RenderPage("~/Views/Home/ViewPage1.cshtml")
	        渲染其他页结束3<br />
	        <br />
	        HOHO,开始学习Section了<br />
	        开始渲染Section<br />
	        声明方式1(推荐):SectionA:<br />
	        @RenderSection("SectionA", false)
	        -------<br />
	        
	        声明方式2:SectionB:<br />
	        @{
	            if (IsSectionDefined("SectionB"))
	            {
	                @RenderSection("SectionB")
	            }
	        }
	        -------<br />
	        渲染Sction结束<br />
	    </div>
	</body>
	</html>
在~/Views/Home/Index.cshtml中更改为如下内容:

	@{
	    ViewBag.Title = "首页";
	}
	
	@section SectionA{
	    <div>这里是SectionA:也不需要写神马runat="server"啊,有木有</div>
	}
	
	@section SectionB{
	    <div>这里是SectionB:也不需要写神马&lt;asp:Content /&gt啊,有木有</div>
	}

	<div>
	    这里就是渲染Body啦.~~不需要写神马&lt;asp:Content /&gt;,其实因为RenderBody()不在有歧义.
	</div>
最后显示结果：
开始渲染Body

这里就是渲染Body啦.

渲染Body结束

开始渲染其他页1

这里是~/Views/Home/ViewPage1.cshtml

str1

str2
渲染其他页结束

开始渲染其他页2

这里是~/Views/Home/ViewPage1.cshtml

str1

str2

渲染其他页结束

开始渲染其他页3

这里是~/Views/Home/ViewPage1.cshtml

str1

str2

渲染其他页结束

HOHO,开始学习Section了

开始渲染Section

声明方式1(推荐):SectionA:

这里是SectionA

-------

声明方式2:SectionB:

这里是SectionB

-------

渲染Sction结束

问:为什么为什么要推荐方式1呢?

答:因为RenderSection()方法有2个重载.

如果使用第一个只接受一个string类型参数的重载的话.~如果你在具体的View中没有利用@section来定义实现的话,运行会报错.所以需要配合另外一个方法IsSectionDefined()来使用,才能防止报错.

而使用第2个重载就可以利用第二个bool类型的参数指明该Section是否为必须的.所以可以在使用该RenderSection方法的时候直接利用第二个重载,再把bool参数值设为false。