<template>
    <div class="custom-pc-set-group">
        <form class="form-horizontal">
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">头图</label>
                    <div class="col-sm-8">
                        <template v-if="groupDate.src">
                            <img v-bind:src="groupDate.src" class="thumbnail col-sm-6">
                        </template>
                        <button type="button" class="btn btn-primary pull-right" @click="picList">添加头图</button>
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">链接</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="groupDate.href">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">标题</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="groupDate.title">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">副标题</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="groupDate.subtitle">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">团购价</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="groupDate.price">
                    </div>
                </div>
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">原价</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control" v-model="groupDate.originprice">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-6">
                    <label class="col-sm-4 control-label">团购时间</label>
                    <div class="col-sm-8">
                        <input type="text" class="form-control date_{{gettime}}">
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-12">
                    <label class="col-sm-2 control-label">简介</label>
                    <div class="col-sm-10">
                        <textarea rows="4" style="width: 100%" v-model="groupDate.brief"></textarea>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <div class="modal fade {{wantumoduleshow?'in':''}}" v-show='wantumoduleshow'>
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" @click='wantumoduleshow=false'><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">图片列表</h4>
                </div>
                <div class="modal-body">
                    <ul class="row wantu-list-pic no-padding" id="listpic{{gettime}}">
                        <li class="col-sm-3" v-for="one in moduleObj.data" @click="choosePic($index, $event)">
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
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
    <div class="modal-backdrop fade {{wantumoduleshow?'in':''}}" v-show='wantumoduleshow'></div>

</template>
<script>
    import componentToPc from '../libs/common.js';
    export default {
        props: ['onedata'],
        data: function(){
            return {
                files: ['upfile.js', 'daterangepicker.css', 'moment.min.js', 'daterangepicker.js'],
                gettime: '',
                wantumoduleshow: false,
                moduleObj: {
                    data: []
                },
                groupDate: {
                    src: '',
                    href: '',
                    price: '',
                    originprice: '',
                    title: '',
                    subtitle: '',
                    startTime: '',
                    endTime: '',
                    brief: ''
                }
            }
        },
        created: function(){
            componentToPc.loadFiles(this.files);
            this.$set('gettime', new Date().getTime());
        },
        ready: function(){
            var self = this;
            self.initDate();
        },
        watch: {

        },
        computed: {

        },
        methods: {
            //初始化时间
            initDate: function(){
                var self = this;
                var locale = componentToPc.localDate;
                console.log($('.date_'+this.gettime))
                console.log(moment())
                $('.date_'+this.gettime).daterangepicker({
                    locale: locale,
                    timePicker24Hour: true,
                    timePicker: true,
                    timePickerIncrement: 10
                });
            },
            //上传图片
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
                    var fileName = files[i].name.replace(/\.\S{1,}$/, '')+'_'+(new Date().getTime());
                    uploader({
                        file: files[i], //文件，必填,html5 file类型，不需要读数据流，
                        name: fileName, //文件名称，选填，默认为文件名称
                        token: ntoken, //token，必填
                        dir: dir, //目录，选填，默认根目录''
                        retries: 0, //重试次数，选填，默认0不重试
                        maxSize: maxSize, //上传大小限制，选填，默认0没有限制
                        callback: function(percent, result) {
                            var tmp = {};
                            if(percent==100){
                                self.$set('groupDate.src', result.url);
                                self.$set('onedata.data', self.groupDate);
                                self.$set('wantumoduleshow', false);
                            }else if(percent==-1){
                                componentToPc.topRightInfoTips({content: '图片大小不能超过1024KB'})
                            }
                        }
                    });
                }
            },
            //图片列表
            picList: function(){
                var self = this,
                    url = componentToPc.host + componentToPc.wantu.listUrl,
                    param = componentToPc.wantu.listParam;

                componentToPc.loadUrl(url, param, function(data){
                    if(data.data&&data.data.length){
                        self.$set('moduleObj.data', data.data);
                    }else{
                        self.$set('moduleObj.data', []);
                    }
                    console.log(self.moduleObj.data)
                    self.$set('wantumoduleshow', true);
                });
            },
            //选择图片
            choosePic: function(index){
                var one = this.moduleObj.data[index];
                this.$set('groupDate.src', one.url);
                this.$set('onedata.data', this.groupDate);
                this.$set('wantumoduleshow', false);
            }
        }
    }
</script>
