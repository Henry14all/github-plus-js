// ==UserScript==
// @name         Github 加速与增强 - 高速下载
// @version      1.0.1
// @author       X.I.U,HenryJiu
// @description  为 Github 的 Clone、Release、Raw、Code(ZIP) 添加高速下载和镜像站跳转，实现各种加速
// @match        https://github.com/*/*
// @match        https://github.com/*/*/releases
// @match        https://github.com/*/*/releases/*
// @icon         https://hub.fastgit.org/favicon.ico
// @require      https://cdn.bootcss.com/jquery/3.4.1/jquery.min.js
// @license      GPL-3.0 License
// @run-at       document-end
// @namespace    https://greasyfork.org/scripts/412883
// ==/UserScript==

(function() {
    var download_url1 = "https://gh.con.sh";
    var download_url1_name = "美国 01";
    var download_url2 = "https://gh.api.99988866.xyz";
    var download_url2_name = "美国 02";
    var download_url3 = "https://download.fastgit.org";
    var download_url3_name = "日本东京";
    var download_url4 = "https://g.ioiox.com";
    var download_url4_name = "中国香港";
    var download_url5 = "https://git.yumenaka.net";
    var download_url5_name = "美国洛杉矶"; // 支持 Raw 加速
    var download_url6 = "https://github.91chifun.workers.dev//";
    var download_url6_name = "CF加速 1";
    var download_url7 = "https://githubplus-js.henryjiu.workers.dev/-----"
    var download_url7_name = "CF加速 2"
    var download_url8 = "https://gh-proxy.henryjiu.workers.dev/";
    var download_url8_name = "CF加速 3";

    var clone_url1 = "https://hub.fastgit.org"; // 中国香港
    var clone_url2 = "https://gitclone.com"; // 中国浙江杭州
    var clone_url3 = "https://github.com.cnpmjs.org"; // 新加坡
    // 这里这里~~
    var raw_fast = "中国国内"; // 指定各个文件名后的云朵使用的高速下载链接，选择范围：[Github、中国国内、中国香港、美国洛杉矶]，各加速源注意事项看下面，自行选择~~
    // 这里这里~~

    //修改版新增的跳转到镜像站~~
    var image_url1 = "https://hub.fastgit.org";//中国香港
    //修改版新增的跳转到镜像站~~

    var raw_url0 = "https://raw.githubusercontent.com";
    var raw_url0_name = "Github"; // 原生链接
    var raw_url1 = "https://cdn.jsdelivr.net";
    var raw_url1_name = "中国国内";
    var raw_url1_tip = "注意：该项目当前分支总文件大小超过 50MB 时，此高速下载链接不可用。&#10;注意：当前分支名为版本号格式时(如 v1.2.3)，此高速下载链接因格式限制不可用。&#10;&#10;";
    var raw_url2 = "https://raw.fastgit.org";
    var raw_url2_name = "中国香港";
    var raw_url2_tip = "注意：单个文件太大时可能会提示超时，可以重试。&#10;&#10;";
    var raw_url4 = "https://githubplus-js.henryjiu.workers.dev/-----";
    var raw_url4_name = "CF加速";
    var raw_url5 = "https://gh-proxy.henryjiu.workers.dev/";
    var raw_url5_name = "CF加速 2";

    var download_zip_svg = `<svg class="octicon octicon-file-zip mr-3" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M3.5 1.75a.25.25 0 01.25-.25h3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h2.086a.25.25 0 01.177.073l2.914 2.914a.25.25 0 01.073.177v8.586a.25.25 0 01-.25.25h-.5a.75.75 0 000 1.5h.5A1.75 1.75 0 0014 13.25V4.664c0-.464-.184-.909-.513-1.237L10.573.513A1.75 1.75 0 009.336 0H3.75A1.75 1.75 0 002 1.75v11.5c0 .649.353 1.214.874 1.515a.75.75 0 10.752-1.298.25.25 0 01-.126-.217V1.75zM8.75 3a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM6 5.25a.75.75 0 01.75-.75h.5a.75.75 0 010 1.5h-.5A.75.75 0 016 5.25zm2 1.5A.75.75 0 018.75 6h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 6.75zm-1.25.75a.75.75 0 000 1.5h.5a.75.75 0 000-1.5h-.5zM8 9.75A.75.75 0 018.75 9h.5a.75.75 0 010 1.5h-.5A.75.75 0 018 9.75zm-.75.75a1.75 1.75 0 00-1.75 1.75v3c0 .414.336.75.75.75h2.5a.75.75 0 00.75-.75v-3a1.75 1.75 0 00-1.75-1.75h-.5zM7 12.25a.25.25 0 01.25-.25h.5a.25.25 0 01.25.25v2.25H7v-2.25z"></path></svg>`;
    var download_clone_svg = `<svg class="octicon octicon-clippy" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M5.75 1a.75.75 0 00-.75.75v3c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-3a.75.75 0 00-.75-.75h-4.5zm.75 3V2.5h3V4h-3zm-2.874-.467a.75.75 0 00-.752-1.298A1.75 1.75 0 002 3.75v9.5c0 .966.784 1.75 1.75 1.75h8.5A1.75 1.75 0 0014 13.25v-9.5a1.75 1.75 0 00-.874-1.515.75.75 0 10-.752 1.298.25.25 0 01.126.217v9.5a.25.25 0 01-.25.25h-8.5a.25.25 0 01-.25-.25v-9.5a.25.25 0 01.126-.217z"></path></svg>`
    var raw_svg = `<svg class="octicon octicon-cloud-download" aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path d="M9 12h2l-3 3-3-3h2V7h2v5zm3-8c0-.44-.91-3-4.5-3C5.08 1 3 2.92 3 5 1.02 5 0 6.52 0 8c0 1.53 1 3 3 3h3V9.7H3C1.38 9.7 1.3 8.28 1.3 8c0-.17.05-1.7 1.7-1.7h1.3V5c0-1.39 1.56-2.7 3.2-2.7 2.55 0 3.13 1.55 3.2 1.8v1.2H12c.81 0 2.7.22 2.7 2.2 0 2.09-2.25 2.2-2.7 2.2h-2V11h2c2.08 0 4-1.16 4-3.5C16 5.06 14.08 4 12 4z"></path></svg>`
    var download_release_style = `padding:0 4px;margin-right: -1px;border-radius: 2px;background-color: #ffffff;border-color: rgba(27, 31, 35, 0.1);font-size: 12px;`

    addRelease(); // Release 加速
    addDownloadZIP(); // Source Code 加速
    addGitClone(); // Download ZIP/Code(ZIP) 加速
    addRawFile(); // Raw 加速
    setTimeout(addDownLink, 2000); // 添加 Raw 下载链接（添加到项目页文件名称后面），延迟 2 秒执行，避免被 pjax 刷掉

    $(document).on('pjax:success',function(evt){
        addRawFile(); // pjax 事件发生后，添加 Raw 加速按钮 及 Raw 下载链接
        setTimeout(addDownLink, 2000); // 延迟 2 秒执行，避免被 pjax 刷掉
    });

    
    // Release 加速
    function addRelease(){
        $(".Box.Box--condensed").each(function () {
            $(this).find(".d-flex.Box-body>a").each(function () {
                var href = $(this).attr("href");
                var href_split = location.href.split("/");
            var url1 = download_url1 + "/github.com" + href;
            var url2 = download_url2 + "/github.com" + href;
            var url3 = download_url3 + href;
            var url4 = download_url4 + "/github.com" + href;
            var url5 = download_url5 + "/github.com" + href;
            var url6 = download_url6 + "/github.com" + href;
            var url7 = download_url7 + "https://github.com" + href;
            var url8 = download_url8 + "/github.com" + href;
            var image1 = image_url1 + "/" + href_split[3] + "/" + href_split[4] + "/" + href_split[5];
                var html1 = `<div style="display: flex;justify-content: flex-end;">
<div><a style="${download_release_style}" class="btn" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url6}" rel="nofollow">${download_url6_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url7}" rel="nofollow">${download_url7_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url8}" rel="nofollow">${download_url8_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${image1}" rel="nofollow">用镜像站访问Releases</a></div>
</div>`;
                $(this).next().after(html1);
            });
            // 修改[文件大小]元素样式
            document.querySelectorAll('small.pl-2.text-gray.flex-shrink-0').forEach(el=>el.style.cssText='display: flex; justify-content: flex-end; flex-grow: 1; margin-right: 8px;');


            // Source Code 加速
            $(this).find(".d-block.Box-body>a").each(function () {
                var href = $(this).attr("href");
            var href_split = location.href.split("/");
            var image1 = image_url1 + "/" + href_split[3] + "/" + href_split[4] + "/" + href_split[5];
            var url1 = download_url1 + "/github.com" + href;
            var url2 = download_url2 + "/github.com" + href;
            var url3 = download_url3 + href;
            var url4 = download_url4 + "/github.com" + href;
            var url5 = download_url5 + "/github.com" + href;
            var url6 = download_url6 + "/github.com" + href;
            var url7 = download_url7 + "https://github.com" + href;
            var url8 = download_url8 + "/github.com" + href;
                var html1 = `<div style="display: flex;justify-content: flex-end;flex-grow: 1;">
<div><a style="${download_release_style}" class="btn" href="${url1}" rel="nofollow">${download_url1_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url2}" rel="nofollow">${download_url2_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url3}" rel="nofollow">${download_url3_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url4}" rel="nofollow">${download_url4_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url5}" rel="nofollow">${download_url5_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url6}" rel="nofollow">${download_url6_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url7}" rel="nofollow">${download_url7_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${url8}" rel="nofollow">${download_url8_name}</a></div>
<div><a style="${download_release_style}" class="btn" href="${image1}" rel="nofollow">用镜像站访问Releases</a></div>
</div>`;
                $(this).after(html1);
            });
            // 修改 Source code 样式，使其和加速按钮并列一排
            document.querySelectorAll('div.d-block.py-1.py-md-2.Box-body.px-2').forEach(el=>el.className='d-flex py-1 py-md-2 Box-body px-2');
        });
    }


    // Download ZIP 加速 和镜像站跳转
    function addDownloadZIP(){
        $(".dropdown-menu.dropdown-menu-sw.p-0 ul li:last-child").each(function () {
            var href = $(this).children("a").attr("href");
            var href_split = location.href.split("/");
            var image1 = image_url1 + href_split[3] + "/" + href_split[4] ;
            var url1 = download_url1 + "/github.com" + href;
            var url2 = download_url2 + "/github.com" + href;
            var url3 = download_url3 + href;
            var url4 = download_url4 + "/github.com" + href;
            var url5 = download_url5 + "/github.com" + href;
            var url6 = download_url6 + "/github.com" + href;
            var url7 = download_url7 + "https://github.com" + href;
            var url8 = download_url8 + "/github.com" + href;
            var image1 = image_url1 + "/" + href_split[3] + "/" + href_split[4]
            var html1 = `
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url1}">${download_zip_svg}Download ZIP ${download_url1_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url2}">${download_zip_svg}Download ZIP ${download_url2_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url3}">${download_zip_svg}Download ZIP ${download_url3_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url4}">${download_zip_svg}Download ZIP ${download_url4_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url5}">${download_zip_svg}Download ZIP ${download_url5_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url6}">${download_zip_svg}Download ZIP ${download_url6_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url7}" title="注意：此加速源每日有调用次数限定！" role="button" class="btn btn-sm BtnGroup-item">${download_zip_svg}Download ZIP ${download_url7_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${url8}">${download_zip_svg}Download ZIP ${download_url8_name}</a></li>
<li class="Box-row Box-row--hover-gray p-0"><a class="d-flex flex-items-center text-gray-dark text-bold no-underline p-3" rel="nofollow" href="${image1}">用镜像站访问本仓库 </a></li>
`;
            $(this).after(html1);
        });
    }


    // Git Clone 加速
    function addGitClone(){
        $("[role='tabpanel'] div.input-group").first().each(function () {
            var href_split = location.href.split("/");
            var url1 = clone_url1 + "/" + href_split[3] + "/" + href_split[4] + ".git";
            var url2 = clone_url2 + "/github.com/" + href_split[3] + "/" + href_split[4] + ".git";
            var url3 = clone_url3 + "/" + href_split[3] + "/" + href_split[4] + ".git";
            var html1 = `
<div class="input-group" style="margin-top: 4px;"><input value="${url1}" aria-label="${url1}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url1}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url2}" aria-label="${url2}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url2}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
<div class="input-group" style="margin-top: 4px;"><input value="${url3}" aria-label="${url3}" type="text" class="form-control input-monospace input-sm bg-gray-light" data-autoselect="" readonly=""><div class="input-group-button"><clipboard-copy value="${url3}" aria-label="Copy to clipboard" class="btn btn-sm" tabindex="0" role="button">${download_clone_svg}</clipboard-copy></div></div>
`;
            $(this).after(html1);
        });
    }


    // Raw 加速
    function addRawFile(){
        $("#raw-url").each(function () {
            var href = location.href.replace('https://github.com','');
            var href2 = href.replace('/blob/','/');
            var url1 = raw_url1 + "/gh" + href.replace('/blob/','@');
            var url2 = raw_url2 + href2;
            var url3 = download_url5 + "/" + raw_url0 + href2;
            var url4 = raw_url4 + "https://raw.githubusercontent.com"  + href2;
            var url5 = raw_url5 + "https://raw.githubusercontent.com"  + href2;
            var html1 = `
<a href="${url1}" title="注意：当该项目当前分支总文件大小超过 50MB 时，该高速下载链接不可用！" role="button" class="btn btn-sm BtnGroup-item">${raw_url1_name}</a>
<a href="${url2}" title="注意：单个文件太大时可能会提示超时，可以重试！" role="button" class="btn btn-sm BtnGroup-item">${raw_url2_name}</a>
<a href="${url3}" role="button" class="btn btn-sm BtnGroup-item">${download_url5_name}</a>
<a href="${url4}" title="注意：此加速源每日有调用次数限定！" role="button" class="btn btn-sm BtnGroup-item">${raw_url4_name}</a>
<a href="${url5}" title="注意：此加速源每日有调用次数限定！" role="button" class="btn btn-sm BtnGroup-item">${raw_url5_name}</a>
`;
            $(this).after(html1);
        });
    }


    // 添加 Raw 下载链接（添加到项目页文件名称后面）
    function addDownLink(){
        // 如果不是项目文件页面，就返回
        var files = $('.octicon.octicon-file');
        if(files.length === 0) return;
        var files1 = $('.fileDownLink');
        if(files1.length > 0) return;

        // 鼠标指向则显示
        var mouseOverHandler = function(evt){
        var elem = evt.currentTarget,
            aElm = elem.querySelectorAll('.fileDownLink');
        aElm.forEach(el=>el.style.visibility = 'visible');
        };

        // 鼠标离开则隐藏
        var mouseOutHandler = function(evt){
            var elem = evt.currentTarget,
                aElm = elem.querySelectorAll('.fileDownLink');
            aElm.forEach(el=>el.style.visibility = 'hidden');
        };

        // 循环添加
        files.each(function(i,fileElm){
            var trElm = fileElm.parentNode.parentNode,
                cntElm = trElm.querySelector('.css-truncate.css-truncate-target.d-block.width-fit a'),
                Name = cntElm.innerText,
                href = cntElm.attributes["href"].nodeValue.replace('https://github.com','');
            // 如果 raw_fast 为 true 则下载链接为高速下载链接，反之为 Github 原生下载链接
            var href2 = href.replace('/blob/','/'),
            url,
            url_name,
            url_tip = "";
            switch(raw_fast)
            {
                case raw_url0_name:
                    url = raw_url0 + href2;
                    url_name = raw_url0_name;
                    break;
                case raw_url1_name:
                    url = raw_url1 + "/gh" + href.replace('/blob/','@');
                    url_name = raw_url1_name;
                    url_tip = raw_url1_tip;
                    break;
                case raw_url2_name:
                    url = raw_url2 + href2;
                    url_name = raw_url2_name;
                    url_tip = raw_url2_tip;
                    break;
                case download_url5_name:
                    url = download_url5 + "/" + raw_url0 + href2;
                    url_name = download_url5_name;
                    break;
            }
            var html1 = ` <a href="${url}" download="${Name}" target="_blank" class="fileDownLink" style="visibility: hidden;" title="「${url_name}」&#10;&#10;[Alt + 左键] 或 [右键 - 另存为...] 下载文件。&#10;注意：鼠标点击 [☁] 图标，而不是左侧的文件名！&#10;&#10;${url_tip}提示：修改脚本头部 [raw_fast] 变量可切换其他加速源。">${raw_svg}</a>`;
            $(cntElm).after(html1);
            // 绑定鼠标事件
            trElm.onmouseover=mouseOverHandler;
            trElm.onmouseout=mouseOutHandler;
        });
    }
})();
