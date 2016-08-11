# 1、开通服务
开通服务，创建空间用于文件存储，参考 [接入指引](http://baichuan.taobao.com/doc2/detail?treeId=38&articleId=102761&docType=1)
# 2、SDK下载
通过 [控制台](http://wantu.taobao.com/mediabase/space/index.htm) 进入 SDK 下载页面，选择服务端SDK，下载 JSSDK(h5)
![](http://imagedemo.image.alimmdn.com/doc/JSSDK/jssdk1.PNG?t)
# 3、使用方法
``` 
window.uploadJSSDK({
    file: File,   //文件，必填,html5 file类型，不需要读数据流
    token: 'test',  //鉴权token，必填
    dir: '',  //目录，选填，默认根目录''
    retries: 0,  //重试次数，选填，默认0不重试
    maxSize: 0,  //上传大小限制，选填，默认0没有限制
    callback: function (code, msg) {
        //code：-1失败，msg失败信息;
        //0-100上传的百分比，msg为undefined;
        //100即完成上传,msg为反馈的JSON信息
    }
});
```
# 4、示例
```
<html>
<head>
    <meta charset="UTF-8">
    <title></title>
    <script src="upfile.js"></script>
</head>
<body>
<div>token：<input id="token"></div>
<div>目录：<input id="dir"></div>
<div>出错重试次数：<input id="retry" value="0"></div>
<div>最大文件限制：<input id="max" value="0"> 0表示没有限制</div>
<div>文件：<input id="file" type="file" multiple onchange="upload(event)"></div>
<div>反馈信息：
    <div id="console"></div>
</div>
<script>

    var uploader = uploadJSSDK;

<<<<<<< HEAD
    function upload(e){
        var files = e.target.files;
        //上传
        for(var i=0;i<files.length;i++){
            uploader({
                file: files[i],   //文件，必填,html5 file类型，不需要读数据流
                token: document.getElementById('token').value,  //token，必填
                dir: document.getElementById('dir').value||'',  //目录，选填，默认根目录''
                retries: parseInt(document.getElementById('retry').value),  //重试次数，选填，默认0不重试
                maxSize: parseInt(document.getElementById('max').value),  //上传大小限制，选填，默认0没有限制
                callback: function (code, msg) {
                    //code：-1失败，msg失败信息；0-100上传的百分比，100即完成上传
                    if(code==100&&msg){
                        msg = JSON.stringify(msg);
                    }
                    var div = document.getElementById('console');
                    div.innerHTML += "<div>"+code+" "+msg+"</div>";
                }
            });
=======
## 使用方法

    window.uploadJSSDK({
        file: File,   //文件，必填,html5 file类型，不需要读数据流
        token: 'test',  //鉴权token，必填
        dir: '',  //目录，选填，默认根目录''
        retries: 0,  //重试次数，选填，默认0不重试
        maxSize: 0,  //上传大小限制，选填，默认0没有限制
        chunkSize: 4*1024*1024,  //分片上传每片大小，选填，默认4M
        name: "test",  //文件名称，选填，默认为文件名称
        callback: function (percent, result) {
            //percent（上传百分比）：-1失败；0-100上传的百分比；100即完成上传
            //result(服务端返回的responseText，json格式)
        }
    }

</script>
</body>

</html>
``` 
