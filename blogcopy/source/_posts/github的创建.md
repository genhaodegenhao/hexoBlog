---
title: github的创建和删除
date: 2016-05-13 20:40:47
tags: github
---
## 创建md文件

#### 创建一个md文件：找到blog文件夹，用hexo new ‘filename’；回车会出现创建的文件和保存路径，复制路径，输入open+路径可以直接打开该md文件。

## 下载github文件

#### 下载github下的文件，在终端中输入保存的路径，然后输入git clone +(SHH下的网址)。

##### eg： ws:Desktop lanou$ git clone git@github.com:iissnan/hexo-theme-next.git。

## Mac终端删除文件

1. 打开终端应用程序
2. 输入命令：sudo (空格) rm (空格)-r (空格)-f (空格)(注意-f后面还有空格)，还要注意，全部小写。
3. 把你要删的文件或者文件夹用mouse拖进终端窗口，好多个也可以一起拖。
4. 然后在终端中回车 。
5. 输入当前管理员用户密码。如果没有密码就直接回车。注意不是root账号的密码。
6. 终端中没有任何提示信息表明成功删除。