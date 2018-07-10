---
title: JSON
date: 2016-12-05 10:26:26
tags: json
---

JSON其实很简单
 
就是一个轻量级的数据格式 

可以简化表示复杂数据结构的工作量 

主要要掌握ES5的全局对象JSON中的两个方法JSON.stringify()和JSON.parse() 

总结几个要记住的重点

JSON.stringify() 

用于把JavaScript对象转换为JSON字符串 

可填写额外两个参数-筛选数组/替换函数和指定缩进 

对象遇到undefined、function、symbol（ES6）会忽略

数组遇到undefined、function、symbol（ES6）会返回null

JSON.parse() 

用于把JSON字符串转换为JavaScript对象 

可填写额外一个参数-还原函数