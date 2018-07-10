---
title: github仓库的创建与推送
date: 2016-05-21 19:27:26
tags: github 文件推送 线上仓库
---
## github仓库的创建
 首先你要先注册一个github账号，具体可参考以下介绍:
### 第一步：
 ![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f438sd00m6j30rv0bin0e.jpg)

### 第二步：
 
 ![](http://ww4.sinaimg.cn/mw690/005SH7k8gw1f438sdmsb1j30ru066abf.jpg)

### 第三步：
 
 ![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f438se5eqvj30pb0gwn0r.jpg)

### 第四步：
 
 ![](http://ww3.sinaimg.cn/mw690/005SH7k8gw1f438sf3e77j30m00h2mzf.jpg)
 
 <br/>
<span style="font-size:30px;color:darkred;">**OK！！！**</span>
<br/>
## github仓库的推送
<br/>

### 第一步：
选择一个合适的地方，创建一个文件夹，
	
	$ mkdir learngit
	$ cd github
	$ pwd
`pwd`命令用于显示当前目录。

### 第二步：
通过`git init`命令把这个目录变成Git可以管理的仓库：

	$ git init
瞬间Git就把仓库建好了，而且告诉你是一个空的仓库（empty Git repository），细心的读者可以发现当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

如果你没有看到.git目录，那是因为这个目录默认是隐藏的，用`ls -ah`命令就可以看见。

### 第三步：
用命令git add告诉Git，把文件添加到仓库：

	$ git add readme.txt

### 第四步：
用命令git commit告诉Git，把文件提交到仓库：

	$ git commit -m "wrote a readme file"
git commit命令，-m后面输入的是本次提交的说明，可以输入任意内容，当然最好是有意义的，这样你就能从历史记录里方便地找到改动记录。

### 第五步：
线上仓库与本地文件连接：

	git remote add origin 仓库路径

### 第六步：
提交到线上：

	git push -u origin master