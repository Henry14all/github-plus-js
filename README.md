## Github 加速与增强 - 高速下载

### 官方脚本发布页：https://greasyfork.org/scripts/412883

这是一个可以对Github进行下载加速以及增强的脚本

基于https://greasyfork.org/scripts/412245 修改而来

具体修改如下：

1.添加几个Cloudflare Workers加速通道

添加于Download ZIP、Raw、Release（包括Source code）中

CF加速 1 ：一个别人搭建的，基于gh-proxy 的加速站

CF加速 2 ：我搭建的反代理系统

CF加速 3 ：我搭建的，基于gh-proxy 系统的加速站



2.在Download ZIP和Release页面中，加入了“用镜像站访问本仓库”和“用镜像站访问Release”功能

点击之后直接跳转到服务器位于中国香港的镜像站，打开仓库（或Release页面）

镜像站由fastgit.org提供！



3.添加了几个鼠标悬停Tips，作者原先就有，但是我加了几个

其余部分与原作者的代码基本相同，话说原作者也是厉害~



本人第一次使用JavaScript，所以代码缩进之类的有点凌乱，请理解下

所以我没改太多~

若是我有空，我会随作者更新，若是我没空，不更新（嘻嘻~）

### 安装方法：（首先确保你有一个用户脚本管理器）
1.访问https://greasyfork.org/scripts/412883 进行安装

2.访问https://raw.fastgit.org/Henry14all/github-plus-js/main/index.js 获取脚本，然后添加到你的用户脚本管理器（不建议非开发者使用此方式）

### 本脚本基于GNU General Public License v3.0开源，GitHub地址：https://github.com/Henry14all/github-plus-js
