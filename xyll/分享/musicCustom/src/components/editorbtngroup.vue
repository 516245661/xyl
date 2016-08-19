<template>
    <div class="custom-pc-editor-btn">
        <ul class="clearfix">
            <li @click="showFn('carousel', $event)">
                <span></span>
                <span>轮播</span>
            </li>
            <li>
                <span></span>
                <span>图片广告</span>
            </li>
            <li @click="showFn('cube', $event)">
                <span></span>
                <span>魔方</span>
            </li>
            <li>
                <span></span>
                <span>报价</span>
            </li>
            <li @click="showFn('group', $event)">
                <span></span>
                <span>团购</span>
            </li>
            <li>
                <span></span>
                <span>音乐</span>
            </li>
            <li>
                <span></span>
                <span>空白辅助</span>
            </li>
            <li>
                <span></span>
                <span>分割线</span>
            </li>
            <li>
                <span></span>
                <span>富文本</span>
            </li>
            <li>
                <span></span>
                <span>文字导航</span>
            </li>
            <li>
                <span></span>
                <span>图片导航</span>
            </li>
            <li>
                <span></span>
                <span>作品推荐</span>
            </li>
            <li>
                <span></span>
                <span>新闻</span>
            </li>
            <li>
                <span>保存</span>
                <span>取消</span>
            </li>
        </ul>
    </div>
</template>
<script>
    export default {
        props: ['componentdata'],
        ready: function(){

        },
        methods: {
            showFn: function(name, event){
                var tmp = {type:name};
                if(name=='cube'){
                    tmp.editBtnTxt = '编辑';
                }
                this.componentdata.data.push(tmp);
                this.componentdata.curIndex = this.componentdata.data.length-1;
            }
        }
    }
</script>
<style>
    .custom-pc-editor-btn{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .custom-pc-editor-btn ul{
        padding: 0;
        margin: 0;
        background: #92949e;
    }
    .custom-pc-editor-btn ul li{
        float: left;
        list-style: none;
        padding: 6px 12px;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
        cursor: pointer;
    }
    .custom-pc-editor-btn ul li>span{
        display: block;
    }
</style>