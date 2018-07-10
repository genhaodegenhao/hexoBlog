---
title: hexo博客的搭建与遇到的问题解答
date: 2016-05-16 18:54:52
tags: hexo 博客
---
#### 1、安装Git
从Git官网上下载，如果电脑安装过Xcode就不用下载了，因为Xcode自带Git。

#### 2、安装node.js
hexo是一个基于bode.js的静态博客生成器，要先安装node.js才能保证hexo的正常运行。

下载地址<https://nodejs.org/en/>，推荐下载v4.4.4LTS稳定版。

安装之后打开终端，输入

	node -v
出现node.js版本号，表示安装成功。

#### 3、安装hexo
推荐用node.js自带的npm安装，在终端中输入以下指令：
	
	
	sudo npm install -g hexo
	
	mpm install hexo-deployer-git -save

#### 4、初始化hexo
新建一个blog文件夹，路径自行选择，并在该文件夹下初始化hexo：

	mkdir blog （新建一个文件夹）
	
	cd blog （进入一个文件夹）
	
	hexo init （初始化）
	
	npm install （npm安装）

#### 5、本地启动测试
	hexo server 或者缩写 hexo s
在浏览器中输入 <http://localhost:4000>就可以查看自己新建的一个博客。

#### 6、新建github仓库并获取二级域名
* 先去github官网注册一个自己的账号
* 新建repository
* 登录github账号后，点击右上角的“+”号按钮，选择“New repository”
* 在repository name栏中填写：用户名.github.io

`注：用户名要和github账号用户名一致，仓库右上部分HTTPS中的内容即为二级域名。`

#### 7、生成SSH Keys
目的是为了将本地git项目与github建立联系。

登录github，找到右上角三角形，依次点击settings > SHH and GPG keys > New SSH key,自己起个title，接下来获取密钥。

在终端输入：

	ssh-keygen
	
	vim ~/.ssh/id_rsa.pub

或者：

	ssh-keygen -t rsa -C "your_email@example.com"

其中 your_email@example.com 为你在 GitHub 注册时的邮箱
	
多按几次回车，生成密钥。

众所周知，在OS系统中，复制文件内容到剪贴板的命令是：

	pbcopy < ~/.ssh/id_rsa.pub

在Win7或者Win10下这条命令就没用了。可以这样：

	clip < ~/.ssh/id_rsa.pub

#### 8、修改上传地址
打开你init生成的blog文件夹下的<span style="color:red">_config.yml文件</span>

找到<span style="color:red">deploy</span>

添加<span style="color:red">type: git</span>

再添加一个属性<span style="color:red">repo:加上你的github仓库的HTTPS地址</span>保存即可。

#### 9、添加博文
	hexo new “filename”
	eg：hexo new 我的第一篇博客
或者直接在source/_posts文件夹下直接创建一个以.md为后缀的文件。

完成后在终端中输入：
	
	hexo g
	hexo d
这样就搭建好了属于自己的博客。

<strong>PS：以下为next博客主题供参考<http://theme-next.iissnan.com/getting-started.html#menu-settings></strong>

#### 10、可能遇到的问题：

**1、部署时出现：Error：EACCES，open '/Users/Desktop/hexo/public/js/script.js'
	原因：权限问题。**
	
	解决方法：在部署命令前加sudo。
	
**2、deployer找不到git：ERROR Deployer not found: git**
	
解决方法：
	
	在终端输入：npm install hexo-deployer-git --save
	
**3、hexo报错**

	{ [Error: Cannot find module './build/Release/DTraceProviderBindings'] code: 	'MODULE_NOT_FOUND' }
	{ [Error: Cannot find module './build/default/DTraceProviderBindings'] code: 	'MODULE_NOT_FOUND' }
	{ [Error: Cannot find module './build/Debug/DTraceProviderBindings'] code: 	'MODULE_NOT_FOUND' }
解决方法：
	
	$ npm install hexo --no-optional

**4、Warning: Permanently added the RSA host key for IP address '192.30.253.113' to the list of known hosts. Permission denied (publickey). fatal: Could not read from remote repository.**

未获得ssh秘钥，可参考第7条获得秘钥。

**5、bash: /dev/tty: No such device or address
error: failed to execute prompt script (exit code 1)
fatal: could not read Username for 'https://github.com': No erro**

将配置文件_config.yml中的deploy：https换成ssh；