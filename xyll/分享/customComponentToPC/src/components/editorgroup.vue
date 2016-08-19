<template>
    <div class="custom-pc-group clearfix">
        <div class="content">
            <div class="head-img">
                <img v-bind:src="groupData.src"/>
            </div>
            <div class="info">
                <h4 class="title">{{groupData.title}}</h4>
                <h4 class="sub-title">{{groupData.subtitle}}</h4>
                <p>{{groupData.brief}}</p>
                <div class="onsale">
                    <a href="#" class="clearfix">
                        <div class="real-price">
                            <span>¥ </span>
                            <span>{{groupData.price}} </span>
                        </div>
                        <div class="origin-price">
                            <span>RMB </span>
                            <span>{{groupData.originprice}} </span>
                        </div>
                        <div class="button">
                            <button type="button"  class="pull-left">马上抢</button>
                        </div>
                    </a>
                </div>
                <p class="time">距离后动结束</p>
            </div>
        </div>
    </div>
</template>
<script>
    import componentToPc from '../libs/common.js';
    export default {
        props: ['onedata'],
        data: function(){
            return {
                groupData: {}
            }
        },
        created: function(){

        },
        ready: function(){

        },
        watch: {

        },
        computed: {
            groupData: function(){
                var data = this.onedata;
                if(data&&data.data){
                    return data.data;
                }else{
                    return {};
                }
            }
        },
        methods: {

        }
    }
</script>
