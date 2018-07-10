---
title: gulp 构建和工具
date: 2016-05-16 18:54:52
tags: gulp
---
### 1、全局安装gulp：
	$npm install --global gulp
	
### 2、新建一个文件夹，并初始化，一直按回车键到结束，会生成一个后缀为.json的文件
		$ npm init 
		
### 3、作为项目的开发依赖（devDependencies）安装，会生成一个node_modules的文件夹
	$ npm install --save-dev gulp
		
### 4、在项目根目录下创建一个名为`gulpfile.js`的文件并添加以下任意内容:
	var gulp = require('gulp');

	gulp.task('default', function(){
 	 
 		 console.log("hello world")
	
	});
	
	gulp.task('hhh', function() {
 	 
 	 	console.log("wahaha")
 		
	});

### 5、运行gulp或者gulp hhh。
	