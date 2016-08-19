<template>

    <div class="form-horizontal">
        <div class="form-group">
            <div class="col-sm-12">
                <button type="button" class="btn btn-default" @click="addPicFn">添加轮播图</button>
            </div>
        </div>
        <template v-if="listData.length">
            <div class="clearfix">
                <div class="col-sm-5 set-box col-md-offset-1" v-for="one in listData">
                    <div class="col-sm-6 no-padding">
                        <img class="img-thumbnail" v-bind:src="one.url+'@70h_120w_1e_1c'" >
                    </div>
                    <div class="col-sm-6 no-padding">
                        <label class="col-sm-2 no-padding text-right">链接:</label>
                        <div class="col-sm-9 no-padding-right link-drop">
                            <a href="#">请选择链接地址</a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Action</a></li>
                                <li><a href="#">Another action</a></li>
                                <li><a href="#">Something else here</a></li>
                                <li><a href="#">Separated link</a></li>
                            </ul>
                        </div>
                    </div>
                    <span class="glyphicon glyphicon-remove-circle" @click="deleteFn($index)"></span>
                </div>
            </div>
        </template>
    </div>

    <div class="modal fade {{wantumoduleshow?'in':''}}" v-show='wantumoduleshow'>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click='wantumoduleshow=false'><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">图片列表</h4>
                </div>
                <div class="modal-body">
                    <ul id="listpic{{gettime}}" class="row wantu-list-pic no-padding">
                        <li class="col-sm-3" v-for="one in moduleObj.data" @click="choosePic($event)">
                            <img class="img-thumbnail" v-bind:src="one.url+'@149h_149w_1e_1c'"/>
                        </li>
                    </ul>
                    <p v-if="!moduleObj.data.length" class="text-center">暂无数据~~~</p>
                    <div class="row no-margin">
                        <div class="upload-pic" @change="uploadPic">
                            <input type="file">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default"  @click='wantumoduleshow=false'>关闭</button>
                    <button type="button" class="btn btn-primary" @click="sureList">确定</button>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade {{wantumoduleshow?'in':''}}" v-show='wantumoduleshow'></div>

</template>

<script>
    import componentToPc from '../libs/common.js';
    export default {
        props: ['onedata'],
        data: function() {
            return {
                files: ['upfile.js'],
                wantumoduleshow: false,
                moduleObj: {
                    data: []
                },
                listData: [],
                gettime: new Date().getTime()
            }
        },
        created: function() {
            componentToPc.loadFiles(this.files);
        },
        ready: function() {
            var getStore = this.onedata;
            getStore = getStore&&getStore.data?getStore.data:[];
            this.$set('listData', getStore);
        },
        methods: {
            addPicFn: function() {
                var self = this,
                url = componentToPc.host + componentToPc.wantu.listUrl,
                param = componentToPc.wantu.listParam;
                componentToPc.loadUrl(url, param, function(data){
                    if(data.data&&data.data.length){
                        self.$set('moduleObj.data', data.data);
                    }else{
                        self.$set('moduleObj.data', []);
                    }
                });
                this.$set('wantumoduleshow', true);
            },
            uploadPic: function(e){
                var self = this,
                    ntoken,
                    uploader = uploadJSSDK,
                    files = e.target.files,
                    host = componentToPc.host,
                    dir = componentToPc.wantu.listParam.dir,
                    url = componentToPc.wantu.url,
                    maxSize = 1024*1024;
                url = host+url;
                ntoken = componentToPc.loadUrl(url, {});
                for (var i = 0; i < files.length; i++) {
                    var fileName = files[i].name.replace(/\.\S{1,}$/,'');
                    uploader({
                        file: files[i], //文件，必填,html5 file类型，不需要读数据流，
                        name:fileName+'_'+(new Date().getTime()), //文件名称，选填，默认为文件名称
                        token: ntoken, //token，必填
                        dir: dir, //目录，选填，默认根目录''
                        retries: 0, //重试次数，选填，默认0不重试
                        maxSize: maxSize, //上传大小限制，选填，默认0没有限制
                        callback: function(percent, result) {
                            var tmp = {};
                            if(percent==100){
                                tmp.url = result.url;
                                tmp.name = result.name;
                                self.listData.push(tmp);
                                self.$set('onedata.data', self.listData);
                                self.$set('wantumoduleshow', false);
                            }else if(percent==-1){
                                componentToPc.topRightInfoTips({content: '图片大小不能超过1024KB'})
                            }
                        }
                    });
                }
            },
            choosePic: function(e){
                var obj = '';
                if(e.target.tagName == 'IMG'){
                    obj = $(e.target).parent();
                }else{
                    obj = $(e.target);
                }
                obj.toggleClass('active');
            },
            sureList: function(){
                var self = this;
                $('#listpic'+this.gettime+' li').each(function(){
                    if($(this).hasClass('active')){
                        var index = $(this).index();
                        self.listData.push(self.moduleObj.data[index]);
                        self.wantumoduleshow = false;
                    }
                });
                self.$set('onedata.data', self.listData);
            },
            deleteFn: function(index){
                this.listData.splice(index, 1);
                this.$set('onedata.data', this.listData);
            }
        }
    }
</script>

<style>

</style>