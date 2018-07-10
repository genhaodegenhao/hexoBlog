---
title: img标签间距问题.原因及解决方法md
date: 2016-09-29 14:30:30
tags: img 间距
---
### img标签间距产生的原因
块级元素包含内联元素如图片文字等时，内联元素默认是和父级元素的baseline（基线）对齐的，而<span style="color:red">baseline又和父级元素底边有一定的距离（这个距离和font有关，不一定是5px）</span>，所以以上代码的效果中不同div之间有间隙，这是因为图片与父元素的底边有距离。说到baseline呢，其实它是<span style="color:red">vertical-align属性的默认值</span>，vertical-align属性是设置元素的垂直排列的，用来定义行内元素的基线相对于该元素所在行的基线的垂直对齐，除了baseline对齐方式之外，还可以是sub | super | top | text-top | middle | bottom | text-bottom |inherit（任何的版本的Internet Explorer （包括 IE8）都不支持属性值 "inherit"）。

### 解决方法
1、设置img的vertical-align属性为bottom；

2、给父元素加上font-size:0的属性，既然这个距离和font有关，那么把字体大小设为0，总该没有距离了吧；

3、给父元素加上line-height，设置line-height不大于12px就能够消除间隙了。