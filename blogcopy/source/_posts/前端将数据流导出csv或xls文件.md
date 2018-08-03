---
title: js将数据流导出csv或xls文件
date: 2016-08-03 18:54:52
tags: csv xls
---

项目中有个需求：将后台返回的流（字符串形式）转成csv或xls文件类型导出；

js实现方法，需要使用filesavejs插件（[地址](https://www.npmjs.com/package/file-saverjs)），代码如下

	import saveAs from 'filesavejs';
	function exportCsvXls(){
        //Excel打开后中文乱码添加如下字符串解决
        var exportContent = "\uFEFF";
        var blob = new Blob([exportContent+"标题,标题,标题\n1,2,3\n4,5,6"],{type: "text/plain;charset=utf-8"});
        // saveAs(blob, "checkoutorder.csv");
        saveAs(blob, "checkoutorder.xls");
    }
    document.getElementById("export").onclick = function(){
        exportCsvXls();
    }

插件的功能比较强大，目前仅用到了导出文本的方法，其他功能待研究；