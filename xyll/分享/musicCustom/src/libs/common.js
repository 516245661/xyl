/**
 * Created by apple on 16/7/13.
 */

export default {
    host: 'http://ludanmall.com/',
    wantu: {
        url: 'wantu/getToken',
        listUrl: 'wantu/getImages',
        listParam: {
            dir: '/microPage/contentPic/xqltest',
            pageSize: 12,
            pageNo: 1,
            open: false
        },
        moduleshow: false
    },
    localDate: {
        separator: " 至 ",
        format: "YYYY-MM-DD HH:mm:00",
        daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
        monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]
    },
    path: 'src/libs/',
    loadFiles (files) {
        var files = files?files:[];
        var path = this.path;
        for(var i=0;i<files.length;i++){
            var creatDom = '';
            var creat = true;
            files[i] = path + files[i];
            if(/\.css$/.test(files[i])){
                $('head link').each(function(index, item){
                    $(item).attr('href');
                    if($(item).attr('href')==files[i]){
                        creat = false;
                    }
                });
                if(!creat){continue;}
                creatDom = '<link type="text/css" rel="stylesheet" href="'+files[i]+'"/>';
            }else if(/\.js/.test(files[i])){
                $('head script').each(function(index, item){
                    $(item).attr('src');
                    if($(item).attr('src')==files[i]){
                        creat = false;
                    }
                });
                if(!creat){continue;}
                creatDom = '<script src="'+files[i]+'"></script>';
            }
            $('head').append(creatDom);
        }
    },
    /***
     *
     * @param url 请求接口
     * @param params 请求参数
     * @param callback 回调
     * @returns {string}
     */
    loadUrl: function(url, params, callback){
        var result = "",
            self = this;
        $.ajax({
            async: callback ? true : false,
            timeout: 150000,
            type: 'post',
            url: url,
            data: params,
            success: function(data) {
                var curData = '';
                if(data.responseData && data.responseData.data){
                    curData = data.responseData.data;
                }else if(data.response&&data.response.sub_msg){
                    curData = data.response;
                    if(data.response.code==3){
                        self.topRightInfoTips({content: data.response.sub_msg});
                        setTimeout(function(){
                            //location.href = '/unlogin/login.html';
                        }, 2000);
                    }
                }else{
                    curData = data;
                }
                if(callback){
                    callback(curData);
                }else{
                    result = curData;
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown){
                self.topRightInfoTips({content:XMLHttpRequest+textStatus+errorThrown});
            }
        });
        return result;
    },
    /***
     *  警告框
     * @param options
     * {color:'warning',//warning 黄色,success 绿色,info 蓝色,danger 红色
         * title:'警告!',//标题
         * content:''//内容
         * }
     */
    topRightInfoTips: function(options){
        var option,
            style = 'position: fixed;right:0px;top:4px;font-size: 16px;',
            html = '';
        $('.alert .close').click();
        option = {color: 'warning', title: '警告!', content: ''};
        $.extend(option,options);
        html ='<div class="alert alert-'+option.color+' alert-dismissible fade in" style="'+style+'" role="alert"> ' +
            '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">×</span></button> ' +
            '<strong>'+option.title+'</strong> '+option.content+' </div>';
        $('body').append(html);
        var setT = setTimeout(function(){
            $('.alert .close').click();
        }, 3000);
        $('.alert').on('click', '.close', function(){
            clearInterval(setT);
        });
        $('.alert').on('mouseover',function(){
            clearInterval(setT);
        });
        $('.alert').on('mouseout',function(){
            setT = setTimeout(function(){
                $('.alert .close').click();
            }, 2000);
        });
    }
}
