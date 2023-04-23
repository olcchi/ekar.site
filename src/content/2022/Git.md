---
layout: ../../layouts/postsLayout.astro
title: Git
collection: 2022
pubDate: 11/23
slug: what-is-git
description: Guide for using Git.
---


# Git命令
写给自己的Git命令合集,因为我知道遇到想不起的Git指令,你会在Google寻找答案而不是这里。

### 用户信息
在多人协作的仓库中,标明身份是必要的,在<code>config --global</code>中的<code>user.name</code>与<code>user.email</code>中录入你的用户名与邮箱地址,通常情况下你只需要设置一次全局用户信息。

```
用户名
$ git config --global user.name "YourName"

用户邮箱
$ git config --global user.email YourEmail@exp.com
```
有时你会想要在不同的项目中使用不同的用户信息,你只需在想要更改用户身份的项目目录下使用去除 <code>--global</code>  选项的Git命令来配置用户信息。

```
用户名
$ git config user.name "YourName"

用户邮箱
$ git config user.email YourEmail@exp.com
```

### 配置
你可以列举出所有的<code>Config / 配置</code>文件或者通过指定<code>Key</code>查看指定的配置项。
```
查询所有Config项
$ git config --list

列出所有Config以及Config文件路径
$ git config --list --show-origin

查看指定的Config项
$ git config <Key>
```
编辑 <code>global Config / 全局配置 </code>文件
```
编辑 global config 文件
$ git config --global --edit

编辑 local config 文件
$ git config --local --edit
```
### 仓库
你可以在目录中通过<code>git init</code>命令创建并初始化新的Git仓库,当你需要克隆一个仓库时可以使用<code>git clone `<git-repo>`</code>命令克隆你需要克隆的仓库到本地。
```
初始化仓库
$ git init

初始化裸仓库
$ git init --bare

克隆仓库
$ git clone <git-repo>
```
当创建/克隆仓库后,你可以通过<code>git status</code>命令查看仓库的状态,也可以通过<code>git add</code>与<code>git rm</code>命令在暂存区对文件进行添加/删除操作
```
查看仓库状态
$ git status

将文件添加至暂存区，文件在被添加至暂存区后状态将会从untracked变成tracked file
$ git add [file a] [file b]

将指定目录添加到暂存区，包括这个目录的所有子目录
$ git add [directory]

将当前目录的所有文件添加到暂存区
$ git add .

每一处变化在被添加至暂存区前都会被要求确认
$ git add -p

删除工作区文件并且将这次删除放入暂存区
$ git rm [file a] [file b] ...

停止追踪指定的文件，但该文件会继续存在于工作区
$ git rm --cached [file]

文件改名,并且改名将被添加至暂存区
$ git mv [file-original] [file-renamed]
```
在你执行完文件的添加/删除操作时
你需要将暂存区里的文件通过<code>git commit</code>命令将提交到仓库区。
```
提交暂存区到仓库区
$ git commit -m [message]

提交暂存区的指定文件到仓库区
$ git commit [file a] [file b] ... -m [message]

提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

提交一次代替上次提交的commit
如果文件没有发生变化,则该操作会改写上一次commit的提交信息
$ git commit --amend -m [message]

重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```
如果你需要撤销你的某一次操作,你可以使用<code>git restore</code>来进行对操作的撤销
```
撤销工作区文件的改动
$ git restore <file>

撤销将文件提交到暂存区的操作,但是工作的文件将会保持改动
$ git restore --staged <file>
```
你可以使用<code>reset</code>命令来回退到某个指定的commit中。
```
回退时源码将被保留在暂存区
$ git reset --soft <commit>

默认的reset操作,回退时源码将被保留在工作区
$ git reset --mixed <commit>

回退时不会保留源码
$ git reset --hard <commit>
```
::: warning
· 在使用 git reset --hard `<commit>` 命令来回退时,将不会保留源码<br/>
:::
当你使用reset命令后想要将本地仓库推送到远程仓库当中时,需要进行一个比较危险的操作<code>push --force</code> 或 <code>push -f</code> 这种操作会将原有的提交记录覆盖。
```
强制推送本地仓库至远程仓库中
$ git push --force 或 git push -f
```
::: warning
· 在使用 git push --force 命令来强制提交本地仓库至远程仓库时,原有提交记录将会被覆盖
:::
### 操作日志
你可以使用<code>git log</code>与<code>git diff</code>命令来查看操作日志与commit之间的差异。
```
查看操作日志
$ git log

查看操作日志以及查看每次commit时发生变更的文件
$ git log --stat

查看最近两次commit文件的差异
$ git log -p -2

查看每一次commit信息，在一行中
$ git log --pretty=oneline

查看最近两周的commit信息
$ git log --since=2.weeks

搜索commit日志，根据指定的关键词
$ git log -S [keyword]

查看工作区与暂存区之间的差异
$ git diff

查看当前的暂存区和上一次commit之间的差异
$ git diff --cached [file]

查看工作区与当前branch最新commit之间的差异
$ git diff HEAD

查看指定的两次commit之间的差异
$ git diff [first-branch]...[second-branch]
```
### 远程协作
远程协作是Git最重要的功能之一,你可以使用<code>git remote</code>命令来查看远程仓库的信息。
```
查看远程服务器的简写
$ git remote

查看需要操作的远程仓库的Git保存的简写名与URL
$ git remote -v

查看指定远程仓库的详细信息
$ git remote show [remote]
```
你可以使用<code>pull</code>与<code>push</code>以及<code>fetch</code>来从远程仓库中拉取或推送文件。
```
添加一个新的远程 Git 仓库，同时指定一个方便使用的简写
$ git remote add <abbr> <url>

从远程仓库中拉取代码，但不会合并
$ git fetch [remote]

取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

将 <branch> 分支上的代码推送到 <remote>
$ git push <remote> <branch>

推送所有分支到远程仓库
$ git push [remote] -all

修改远程仓库的简写名
$ git remote rename <old> <new>

移除远程仓库
$ git remote remove <remote>

删除远程分支
$ git push origin --delete <branch>
```
### 分支
每一个分支都可以被看作是独立的开发线，你可以创建一个属于自己的分支来进行开发，并且你在此分支的任何操作都不会影响远程仓库，你可以使用<code>git branch</code>命令来对分支进行查看、建立、删除、更该操作。
```
列出本地分支
$ git branch

列出本地分支与追踪关系
$ git branch -vv

列出远程分支
$ git branch -r

列出所有分支
$ git branch -a

建立分支不切换工作区
$ git branch <branch>

删除已被合并的分支
$ git branch -d <branch>

强制删除未被合并的分支
$ git branch -D <branch>

更改分支名字
$ git branch -m <newbranch>

设置追踪分支
$ git branch -u <upstream>
```
有时你需要切换到另外的分支进行开发,你可以使用<code>git checkout</code>命令在分支之间切换。
```
切换分支
git checkout <branch>

建立分支并切换工作区
git checkout -b <branch>

切换到最近一次分支
git checkout -

建立无任何提交历史的分支
git checkout --orphan <branch>
```
完成开发的分支在最后会被决定去向,如果决定合并到主分支中,在这时你可以使用<code>git merge</code>命令来进行分支合并操作。
```
合并 develop 分支到本分支
git merge develop

强制合并分支后生成 merge commit
git merge -no-ff develop

合并最近切换分支
git merge -

变基合并 develop 分支
git rebase develop

变基进入交互式界面
git rebase -i
```
### 标签
在开发进行到重要的版本时你会希望标记这次的快照,标签的功能便是让你获得这样做的能力。
```
列出所有标签并显示标签信息
git tag -ln

添加一个标签
git tag -a v1.0.0 -m <message>

在某个 commit 上添加一个标签
git tag v0.9.0 <commit>

删除一个标签
git tag -d v1.0.0

查看某个标签信息
git show v1.0.0

推送所有标签到远程仓库
git push --tags

使用最近的标签描述本次提交
git describe
```
